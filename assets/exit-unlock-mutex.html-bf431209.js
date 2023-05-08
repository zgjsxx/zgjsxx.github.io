import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<h1 id="如果持有互斥锁的线程没有解锁退出了-该如何处理" tabindex="-1"><a class="header-anchor" href="#如果持有互斥锁的线程没有解锁退出了-该如何处理" aria-hidden="true">#</a> 如果持有互斥锁的线程没有解锁退出了，该如何处理？</h1><h2 id="问题引入" tabindex="-1"><a class="header-anchor" href="#问题引入" aria-hidden="true">#</a> 问题引入</h2><p>看下面一段代码，两个线程将竞争互斥锁mutex而进入临界区， 线程2在竞争互斥锁之前会sleep 2秒， 因此大概率线程1将获得互斥锁。 然而线程1执行完临界区的代码之后， 没有执行解锁操作，就退出了。</p><p>这样会导致线程2将死锁，因为该锁的状态将永远是锁定状态， 它将永远都不能获得锁。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/mman.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/wait.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;fcntl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
pthread_mutex_t mutex<span class="token punctuation">;</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;func1 get lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token function">pthread_exit</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;func2 get lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    pthread_t tid1<span class="token punctuation">,</span> tid2<span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid1<span class="token punctuation">,</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid2<span class="token punctuation">,</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么遇到这种情况该如何处理呢?</p><h2 id="pthread-mutex-robust-和-pthread-mutex-consistent登场了" tabindex="-1"><a class="header-anchor" href="#pthread-mutex-robust-和-pthread-mutex-consistent登场了" aria-hidden="true">#</a> PTHREAD_MUTEX_ROBUST 和 pthread_mutex_consistent登场了</h2><p>首先给出解决方案，如果出现了上述的场景，就需要使用互斥锁的<strong>PTHREAD_MUTEX_ROBUST属性</strong>和<strong>pthread_mutex_consistent函数</strong>。</p><p>设置PTHREAD_MUTEX_ROBUST属性需要使用pthread_mutexattr_setrobust函数, 其原型如下:</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">pthread_mutexattr_setrobust</span><span class="token punctuation">(</span>pthread_mutexattr_t <span class="token operator">*</span>attr<span class="token punctuation">,</span>
       <span class="token keyword">int</span> robust<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用了该属性之后，如果某个持有互斥锁的线程还没有释放互斥锁就退出的话， 那么其他线程在进行加锁时将会收到一个<strong>EOWNERDEAD</strong>的错误，这就提示加锁线程， 目前持有锁的线程<strong>已经死亡</strong>， 可以对互斥锁的状态进行<strong>重置</strong>。</p><p>而重置的过程就需要使用到<strong>pthread_mutex_consistent</strong>方法。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">pthread_mutex_consistent</span><span class="token punctuation">(</span>pthread_mutex_t <span class="token operator">*</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/mman.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/wait.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;fcntl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span> </span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
pthread_mutex_t mutex<span class="token punctuation">;</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;func1 get lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token function">pthread_exit</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> r <span class="token operator">=</span> <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">==</span> EOWNERDEAD<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;thread2 will unlock the lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
        <span class="token function">pthread_mutex_consistent</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>  

    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;func2 get lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    pthread_mutexattr_t attr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> err <span class="token operator">=</span> <span class="token function">pthread_mutexattr_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> err<span class="token punctuation">;</span>
         
    <span class="token function">pthread_mutexattr_setrobust</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span>PTHREAD_MUTEX_ROBUST<span class="token punctuation">)</span><span class="token punctuation">;</span>  
    <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">,</span> <span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    pthread_t tid1<span class="token punctuation">,</span> tid2<span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid1<span class="token punctuation">,</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid2<span class="token punctuation">,</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要特别注意的是，如果owner死亡后，这个锁的继任者，没有<strong>调用pthread_mutex_consistent</strong>恢复锁的一致性的话，那么后续对该锁的操作除了pthread_mutex_destroy以外， 其他的操作都将失败， 并且返回<strong>ENOTRECOVERABLE错误</strong>，意味着该锁彻底可再用了， 只有将其销毁。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;unistd.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/mman.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/types.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;sys/wait.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;fcntl.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;string.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdlib.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
pthread_mutex_t mutex<span class="token punctuation">;</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;func1 get lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token function">pthread_exit</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> r <span class="token operator">=</span> <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*    if (r == EOWNERDEAD)
    {
        cout &lt;&lt; &quot;thread2 will unlock the lock&quot; &lt;&lt; endl;
        pthread_mutex_consistent(&amp;mutex);
    }
*/</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;func2 get lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">func3</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> param<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> r <span class="token operator">=</span> <span class="token function">pthread_mutex_lock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;err = &quot;</span> <span class="token operator">&lt;&lt;</span> r <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token comment">/*    if (r == EOWNERDEAD)
    {
        cout &lt;&lt; &quot;thread2 will unlock the lock&quot; &lt;&lt; endl;
        pthread_mutex_consistent(&amp;mutex);
    }
*/</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;func3 get lock&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> i<span class="token punctuation">;</span>
    pthread_mutexattr_t attr<span class="token punctuation">;</span>
    <span class="token keyword">int</span> err <span class="token operator">=</span> <span class="token function">pthread_mutexattr_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> err<span class="token punctuation">;</span>

    <span class="token function">pthread_mutexattr_setrobust</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>attr<span class="token punctuation">,</span>PTHREAD_MUTEX_ROBUST<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_init</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">,</span> <span class="token operator">&amp;</span>attr<span class="token punctuation">)</span><span class="token punctuation">;</span>

    pthread_t tid1<span class="token punctuation">,</span> tid2<span class="token punctuation">,</span> tid3<span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func1<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func2<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tid3<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">,</span> func3<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid1<span class="token punctuation">,</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid2<span class="token punctuation">,</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_join</span><span class="token punctuation">(</span>tid3<span class="token punctuation">,</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">pthread_mutex_destroy</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>mutex<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论：</h2><ul><li>在多线程/多进程程序中，离开临界区时候一定需要释放互斥锁。 可以使用RAII的设计方法， 离开作用域的时候栈对象析构， 从而释放锁。</li><li>在多线程/多进程程序中,如果持有锁的owner意外退出，如果还想继续使用该锁, 那么该锁的后续的owner需要使用PTHREAD_MUTEX_ROBUST和pthread_mutex_consistent对互斥锁的状态进行恢复。</li></ul>`,18),c=[e];function o(i,l){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","exit-unlock-mutex.html.vue"]]);export{r as default};
