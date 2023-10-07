import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<h1 id="linux读写锁的死锁问题" tabindex="-1"><a class="header-anchor" href="#linux读写锁的死锁问题" aria-hidden="true">#</a> Linux读写锁的死锁问题</h1><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;pthread.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h&gt;</span></span>


pthread_rwlock_t m_lock<span class="token punctuation">;</span>
pthread_rwlockattr_t attr<span class="token punctuation">;</span>

<span class="token keyword">int</span> A <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> B <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">//线程1</span>
<span class="token keyword">void</span><span class="token operator">*</span> <span class="token function">threadFunc1</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token operator">*</span> p<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 running..\\n&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">pthread_rwlock_rdlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 read source A=%d\\n&quot;</span><span class="token punctuation">,</span> A<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">usleep</span><span class="token punctuation">(</span><span class="token number">3000000</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 等待100ms，此时线程2大概率会被唤醒并申请写锁</span>

  <span class="token function">pthread_rwlock_rdlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;thread 1 read source B=%d\\n&quot;</span><span class="token punctuation">,</span> B<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">//释放读锁</span>
  <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">pthread_rwlock_unlock</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>m_lock<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//线程2</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写优先</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;thread&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;mutex&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;condition_variable&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;shared_mutex&gt;</span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;\\n&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">template</span><span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token keyword">typename</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> Args<span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span>T<span class="token operator">&amp;&amp;</span> first<span class="token punctuation">,</span> Args<span class="token operator">&amp;&amp;</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cout <span class="token operator">&lt;&lt;</span> first <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>
    <span class="token function">print</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">forward</span><span class="token generic class-name"><span class="token operator">&lt;</span>Args<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

std<span class="token double-colon punctuation">::</span>shared_mutex mtx<span class="token punctuation">;</span>
<span class="token keyword">int</span> step <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
std<span class="token double-colon punctuation">::</span>mutex cond_mtx<span class="token punctuation">;</span>
std<span class="token double-colon punctuation">::</span>condition_variable cond<span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//step0: 读锁</span>
    shared_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>shared_mutex<span class="token operator">&gt;</span> <span class="token function">lock</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>

    unique_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>mutex<span class="token operator">&gt;</span> <span class="token function">uniqueLock</span><span class="token punctuation">(</span>cond_mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
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
    shared_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>shared_mutex<span class="token operator">&gt;</span> <span class="token function">lock1</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;read lock 2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//等待step0: 读锁 结束</span>
    unique_lock<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>mutex<span class="token operator">&gt;</span> <span class="token function">uniqueLock</span><span class="token punctuation">(</span>cond_mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cond<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span>uniqueLock<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> step <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    uniqueLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//step1: 写锁</span>
    lock_guard<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>shared_mutex<span class="token operator">&gt;</span> <span class="token function">lock</span><span class="token punctuation">(</span>mtx<span class="token punctuation">)</span><span class="token punctuation">;</span>

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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","read-write-mutex-deadlock.html.vue"]]);export{k as default};
