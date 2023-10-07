import{_ as t,V as p,W as e,X as n,Y as o,$ as c,a0 as s,F as i}from"./framework-9a29aaa0.js";const l={},u=s(`<h1 id="linux读写锁的容易犯的问题" tabindex="-1"><a class="header-anchor" href="#linux读写锁的容易犯的问题" aria-hidden="true">#</a> Linux读写锁的容易犯的问题</h1><p><strong>读写锁</strong>是互斥锁之外的另一种用于多线程之间同步的一种方式。</p><p>多线程对于一个共享变量的<strong>读操作</strong>是安全的， 而<strong>写操作</strong>是不安全的。如果在一个读很多而写很少的场景之下，那么使用互斥锁将会阻碍大量的线程安全的读操作的进行。在这种场景下，读写锁这样一种设计便诞生了。</p><p>读写锁的特性如下表所示， 总结起来就是<strong>读读不互斥</strong>， <strong>读写互斥</strong>， <strong>写写互斥</strong>。</p><table><thead><tr><th></th><th>读</th><th>写</th></tr></thead><tbody><tr><td>读</td><td>不互斥</td><td>互斥</td></tr><tr><td>写</td><td>互斥</td><td>互斥</td></tr></tbody></table><p>看似这样好的一个设计在实际的使用中确存在诸多的使用误区，陈硕大神在他的<code>&lt;&lt;Linux多线程服务端编程&gt;&gt;</code>一书中曾给出他的建议，不要使用读写锁。 为什么如此呢？ 下面一一道来。</p><h2 id="读写锁使用的正确性" tabindex="-1"><a class="header-anchor" href="#读写锁使用的正确性" aria-hidden="true">#</a> 读写锁使用的正确性</h2><p>读写锁第一个容易出错的地方就是可能在持有读锁的地方修改了共享数据。对于一些比较简单的方法可能是不容易出错的，但是对于嵌套调用的场景下，也是容易犯错的。例如下面的例子，read方法持有了读锁，但是operator4会修改共享变量。由于operator4的调用深度较深，因此可能容易犯错。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//operator4会修改共享变量</span>
<span class="token keyword">void</span> <span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">operation4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">operation2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">operation3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>shared_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>shared_mutex<span class="token operator">&gt;</span> <span class="token function">lock</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">operation1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="读写锁性能上的开销" tabindex="-1"><a class="header-anchor" href="#读写锁性能上的开销" aria-hidden="true">#</a> 读写锁性能上的开销</h2><p><strong>读写锁</strong>从设计上看是比<strong>互斥锁</strong>要复杂一些，因此其内部加锁和解锁的逻辑也要比互斥锁要复杂。</p><p>下面是glibc读写锁的数据结构，可以推测在加锁解锁过程中要<strong>更新reader和writers的数目</strong>，而互斥锁是无需这样的操作的。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">struct</span> <span class="token class-name">__pthread_rwlock_arch_t</span>
<span class="token punctuation">{</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __readers<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __writers<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __wrphase_futex<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __writers_futex<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __pad3<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __pad4<span class="token punctuation">;</span>
  <span class="token keyword">int</span> __cur_writer<span class="token punctuation">;</span>
  <span class="token keyword">int</span> __shared<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">int</span> __pad1<span class="token punctuation">;</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">long</span> <span class="token keyword">int</span> __pad2<span class="token punctuation">;</span>
  <span class="token comment">/* FLAGS must stay at this position in the structure to maintain
     binary compatibility.  */</span>
  <span class="token keyword">unsigned</span> <span class="token keyword">int</span> __flags<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的一个例子使用互斥锁和读写锁分别对一个临界区进行反复的加锁和解锁。因为临界区没有内容，因此开销基本都在锁的加锁和解锁上。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//g++ test1.cpp -o test1</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>

pthread_mutex_t mutex<span class="token punctuation">;</span>
<span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">thread_func</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> j<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span>j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span><span class="token number">10000000</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// test</span>
                <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">pthread_exit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pthread_t id1<span class="token punctuation">;</span>
        pthread_t id2<span class="token punctuation">;</span>
        pthread_t id3<span class="token punctuation">;</span>
        pthread_t id4<span class="token punctuation">;</span>
        <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id3<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id4<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id3<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id4<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">//g++ test2.cpp -o test2</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>

pthread_rwlock_t rwlock<span class="token punctuation">;</span>
<span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token operator">*</span><span class="token function">thread_func</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> j<span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span>j<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> j<span class="token operator">&lt;</span><span class="token number">10000000</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">pthread_rwlock_rdlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>rwlock<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//test2</span>
                <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>rwlock<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">pthread_exit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pthread_t id1<span class="token punctuation">;</span>
        pthread_t id2<span class="token punctuation">;</span>
        pthread_t id3<span class="token punctuation">;</span>
        pthread_t id4<span class="token punctuation">;</span>
        <span class="token function">pthread_rwlock_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>rwlock<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id3<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>id4<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> thread_func<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span><span class="token punctuation">)</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id3<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_join</span><span class="token punctuation">(</span>id4<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">pthread_rwlock_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>rwlock<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># time ./test1</span>

real    0m2.531s
user    0m5.175s
sys     0m4.200s
<span class="token punctuation">[</span>root@localhost test1<span class="token punctuation">]</span><span class="token comment"># time ./test2</span>

real    0m4.490s
user    0m17.626s
sys     0m0.004s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出，单纯从加锁和解锁的角度看，互斥锁的性能要好于读写锁。</p><p>当然这里测试时，临界区的内容时空的，如果临界区较大，那么读写锁的性能可能会优于互斥锁。</p><p>不过在多线程编程中，我们总是会尽可能的减少临界区的大小，因此很多时候，读写锁并没有想象中的那么高效。</p><h2 id="读写锁容易造成死锁" tabindex="-1"><a class="header-anchor" href="#读写锁容易造成死锁" aria-hidden="true">#</a> 读写锁容易造成死锁</h2><p>前面提到过读写锁这样的设计就是在<strong>读多写少</strong>的场景下产生的，然而这样的场景下，很容易造成写操作的饥饿。因为读操作过多，写操作不能拿到锁，造成写操作的阻塞。</p><p>因此，写操作获取锁通常拥有高优先级。</p><p>这样的设定对于下面的场景，将会造成死锁。假设有线程A、B和锁，按如下时序执行：</p><ul><li>1、线程A申请读锁；</li><li>2、线程B申请写锁；</li><li>3、线程A再次申请读锁；</li></ul><p>第2步中，线程B在申请写锁的时候，线程A还没有释放读锁，于是需要等待。第3步中，因此线程B正在申请写锁，于是线程A申请读锁将会被阻塞，于是陷入了死锁的状态。</p><p>下面使用c++17的shared_mutex来模拟这样的场景。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thread&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;mutex&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;condition_variable&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;shared_mutex&gt;</span></span>

<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token keyword">typename</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span>T<span class="token operator">&amp;&amp;</span> first<span class="token punctuation">,</span> Args<span class="token operator">&amp;&amp;</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> first <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">forward</span><span class="token generic class-name"><span class="token operator">&lt;</span>Args<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

std<span class="token double-colon punctuation">::</span>shared_mutex mtx<span class="token punctuation">;</span>
<span class="token keyword">int</span> step <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
std<span class="token double-colon punctuation">::</span>mutex cond_mtx<span class="token punctuation">;</span>
std<span class="token double-colon punctuation">::</span>condition_variable cond<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//step0: 读锁</span>
    std<span class="token double-colon punctuation">::</span>shared_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>shared_mutex<span class="token operator">&gt;</span> <span class="token function">lock</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>

    std<span class="token double-colon punctuation">::</span>unique_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>mutex<span class="token operator">&gt;</span> <span class="token function">uniqueLock</span><span class="token punctuation">(</span>cond_mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;read lock 1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//通知step0结束</span>
    <span class="token operator">++</span>step<span class="token punctuation">;</span>
    cond<span class="token punctuation">.</span><span class="token function">notify_all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//等待step1: 写锁 结束</span>
    cond<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span>uniqueLock<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> step <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    uniqueLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//step2: 再次读锁</span>
    std<span class="token double-colon punctuation">::</span>shared_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>shared_mutex<span class="token operator">&gt;</span> <span class="token function">lock1</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;read lock 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//等待step0: 读锁 结束</span>
    std<span class="token double-colon punctuation">::</span>unique_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>mutex<span class="token operator">&gt;</span> <span class="token function">uniqueLock</span><span class="token punctuation">(</span>cond_mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cond<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span>uniqueLock<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> step <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    uniqueLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//step1: 写锁</span>
    std<span class="token double-colon punctuation">::</span>lock_guard<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>shared_mutex<span class="token operator">&gt;</span> <span class="token function">lock</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>

    uniqueLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;write lock&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//通知step1结束</span>
    <span class="token operator">++</span>step<span class="token punctuation">;</span>
    cond<span class="token punctuation">.</span><span class="token function">notify_all</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    uniqueLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>thread t_read<span class="token punctuation">{</span>read<span class="token punctuation">}</span><span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>thread t_write<span class="token punctuation">{</span>write<span class="token punctuation">}</span><span class="token punctuation">;</span>
    t_read<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    t_write<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用下面的在线版本进行测试。</p>`,29),r={href:"https://godbolt.org/z/rrMYGnebP",target:"_blank",rel:"noopener noreferrer"},k=s(`<p>在线版本的输出是下面这样的，程序由于死锁执行超时被杀掉了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Killed - processing <span class="token function">time</span> exceeded
Program terminated with signal: SIGKILL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>死锁的原因就是线程1与线程2相互等待导致。</p><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/Linux/application-dev/read-write-mutex/dead-lock.png" alt="shared_mutex" tabindex="0" loading="lazy"><figcaption>shared_mutex</figcaption></figure><p>对于glibc的读写锁，其提供了<strong>读优先</strong>和<strong>写优先</strong>的属性。</p><p>使用<strong>pthread_rwlockattr_setkind_np</strong>方法即可设置读写锁的属性。其拥有下面的属性：</p><ul><li>PTHREAD_RWLOCK_PREFER_READER_NP,   //读者优先（即同时请求读锁和写锁时，请求读锁的线程优先获得锁）</li><li>PTHREAD_RWLOCK_PREFER_WRITER_NP, //不要被名字所迷惑，也是读者优先</li><li>PTHREAD_RWLOCK_PREFER_WRITER_NONRECURSIVE_NP,  //写者优先（即同时请求读锁和写锁时，请求写锁的线程优先获得锁）</li><li>PTHREAD_RWLOCK_DEFAULT_NP = PTHREAD_RWLOCK_PREFER_READER_NP // 默认，读者优先</li></ul><p>glibc的读写锁模式是读优先的。下面分别使用<strong>读优先</strong>和<strong>写优先</strong>来进行测试。</p><ul><li>写优先</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>

pthread_rwlock_t m_lock<span class="token punctuation">;</span>
pthread_rwlockattr_t attr<span class="token punctuation">;</span>

<span class="token keyword">int</span> A <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> B <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// thread1</span>
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">threadFunc1</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> p<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 running..\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlock_rdlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 read source A=%d\\n&quot;</span><span class="token punctuation">,</span> A<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">usleep</span><span class="token punctuation">(</span><span class="token number">3000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 等待3s，此时线程2大概率会被唤醒并申请写锁</span>

    <span class="token function">pthread_rwlock_rdlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 read source B=%d\\n&quot;</span><span class="token punctuation">,</span> B<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//释放读锁</span>
    <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//thread2</span>
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">threadFunc2</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> p<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 2 running..\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlock_wrlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    A <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    B <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 2 write source A and B\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//释放写锁</span>
    <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

    <span class="token function">pthread_rwlockattr_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlockattr_setkind_np</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> PTHREAD_RWLOCK_PREFER_WRITER_NONRECURSIVE_NP<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//设置写锁优先级高</span>

    <span class="token comment">//初始化读写锁</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_rwlock_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">,</span> <span class="token operator">&amp;</span>attr<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;init rwlock failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//初始化线程</span>
    pthread_t hThread1<span class="token punctuation">;</span>
    pthread_t hThread2<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hThread1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>threadFunc1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;create thread 1 failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">usleep</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hThread2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>threadFunc2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;create thread 2 failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">pthread_join</span><span class="token punctuation">(</span>hThread1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_join</span><span class="token punctuation">(</span>hThread2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">pthread_rwlock_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置写优先会导致死锁。</p><ul><li>读优先</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>

pthread_rwlock_t m_lock<span class="token punctuation">;</span>
pthread_rwlockattr_t attr<span class="token punctuation">;</span>

<span class="token keyword">int</span> A <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> B <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// thread1</span>
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">threadFunc1</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> p<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 running..\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlock_rdlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 read source A=%d\\n&quot;</span><span class="token punctuation">,</span> A<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">usleep</span><span class="token punctuation">(</span><span class="token number">3000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 等待3s，此时线程2大概率会被唤醒并申请写锁</span>

    <span class="token function">pthread_rwlock_rdlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 read source B=%d\\n&quot;</span><span class="token punctuation">,</span> B<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//释放读锁</span>
    <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//thread2</span>
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">threadFunc2</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> p<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 2 running..\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlock_wrlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    A <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    B <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 2 write source A and B\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//释放写锁</span>
    <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>

    <span class="token function">pthread_rwlockattr_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_rwlockattr_setkind_np</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span> PTHREAD_RWLOCK_PREFER_READER_NP<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//初始化读写锁</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_rwlock_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">,</span> <span class="token operator">&amp;</span>attr<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;init rwlock failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//初始化线程</span>
    pthread_t hThread1<span class="token punctuation">;</span>
    pthread_t hThread2<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hThread1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>threadFunc1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;create thread 1 failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">usleep</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>hThread2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>threadFunc2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;create thread 2 failed\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">pthread_join</span><span class="token punctuation">(</span>hThread1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_join</span><span class="token punctuation">(</span>hThread2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">pthread_rwlock_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>读优先则没有死锁的问题，可以正常的执行下去。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>thread <span class="token number">1</span> running<span class="token punctuation">..</span>
thread <span class="token number">1</span> <span class="token builtin class-name">read</span> <span class="token builtin class-name">source</span> <span class="token assign-left variable">A</span><span class="token operator">=</span><span class="token number">0</span>
thread <span class="token number">2</span> running<span class="token punctuation">..</span>
thread <span class="token number">1</span> <span class="token builtin class-name">read</span> <span class="token builtin class-name">source</span> <span class="token assign-left variable">B</span><span class="token operator">=</span><span class="token number">0</span>
thread <span class="token number">2</span> <span class="token function">write</span> <span class="token builtin class-name">source</span> A and B
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过上面的实验，当reader lock需要重入时，需要很谨慎，一旦读写锁的属性是写优先，那么很有可能会产生死锁。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>读写锁适用于读多写少的场景，在这种场景下可能会有一些性能收益</li><li>读写锁的使用上存在着一些陷阱，平常尽量用互斥锁(mutex)代替读写锁。</li></ul>`,18);function d(v,m){const a=i("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[n("a",r,[o("have a try"),c(a)])]),k])}const h=t(l,[["render",d],["__file","read-write-mutex-deadlock.html.vue"]]);export{h as default};
