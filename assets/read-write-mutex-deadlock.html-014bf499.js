const n=JSON.parse('{"key":"v-d6087b44","path":"/posts/Linux/application-dev/read-write-mutex-deadlock.html","title":"Linux读写锁的死锁问题","lang":"zh-CN","frontmatter":{"description":"Linux读写锁的死锁问题 #include &lt;iostream&gt; #include &lt;pthread.h&gt; #include &lt;unistd.h&gt; pthread_rwlock_t m_lock; pthread_rwlockattr_t attr; int A = 0, B = 0; //线程1 void* threadFunc1(void* p) { printf(\\"thread 1 running..\\\\n\\"); pthread_rwlock_rdlock(&amp;m_lock); printf(\\"thread 1 read source A=%d\\\\n\\", A); usleep(3000000); // 等待100ms，此时线程2大概率会被唤醒并申请写锁 pthread_rwlock_rdlock(&amp;m_lock); printf(\\"thread 1 read source B=%d\\\\n\\", B); //释放读锁 pthread_rwlock_unlock(&amp;m_lock); pthread_rwlock_unlock(&amp;m_lock); return NULL; } //线程2 void* threadFunc2(void* p) { printf(\\"thread 2 running..\\\\n\\"); pthread_rwlock_wrlock(&amp;m_lock); A = 1; B = 1; printf(\\"thread 2 write source A and B\\\\n\\"); //释放写锁 pthread_rwlock_unlock(&amp;m_lock); return NULL; } int main() { pthread_rwlockattr_init(&amp;attr); pthread_rwlockattr_setkind_np(&amp;attr, PTHREAD_RWLOCK_PREFER_WRITER_NONRECURSIVE_NP);//设置写锁优先级高 //初始化读写锁 if (pthread_rwlock_init(&amp;m_lock, &amp;attr) != 0) { printf(\\"init rwlock failed\\\\n\\"); return -1; } //初始化线程 pthread_t hThread1; pthread_t hThread2; if (pthread_create(&amp;hThread1, NULL, &amp;threadFunc1, NULL) != 0) { printf(\\"create thread 1 failed\\\\n\\"); return -1; } usleep(1000000); if (pthread_create(&amp;hThread2, NULL, &amp;threadFunc2, NULL) != 0) { printf(\\"create thread 2 failed\\\\n\\"); return -1; } pthread_join(hThread1, NULL); pthread_join(hThread2, NULL); pthread_rwlock_destroy(&amp;m_lock); return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/application-dev/read-write-mutex-deadlock.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Linux读写锁的死锁问题"}],["meta",{"property":"og:description","content":"Linux读写锁的死锁问题 #include &lt;iostream&gt; #include &lt;pthread.h&gt; #include &lt;unistd.h&gt; pthread_rwlock_t m_lock; pthread_rwlockattr_t attr; int A = 0, B = 0; //线程1 void* threadFunc1(void* p) { printf(\\"thread 1 running..\\\\n\\"); pthread_rwlock_rdlock(&amp;m_lock); printf(\\"thread 1 read source A=%d\\\\n\\", A); usleep(3000000); // 等待100ms，此时线程2大概率会被唤醒并申请写锁 pthread_rwlock_rdlock(&amp;m_lock); printf(\\"thread 1 read source B=%d\\\\n\\", B); //释放读锁 pthread_rwlock_unlock(&amp;m_lock); pthread_rwlock_unlock(&amp;m_lock); return NULL; } //线程2 void* threadFunc2(void* p) { printf(\\"thread 2 running..\\\\n\\"); pthread_rwlock_wrlock(&amp;m_lock); A = 1; B = 1; printf(\\"thread 2 write source A and B\\\\n\\"); //释放写锁 pthread_rwlock_unlock(&amp;m_lock); return NULL; } int main() { pthread_rwlockattr_init(&amp;attr); pthread_rwlockattr_setkind_np(&amp;attr, PTHREAD_RWLOCK_PREFER_WRITER_NONRECURSIVE_NP);//设置写锁优先级高 //初始化读写锁 if (pthread_rwlock_init(&amp;m_lock, &amp;attr) != 0) { printf(\\"init rwlock failed\\\\n\\"); return -1; } //初始化线程 pthread_t hThread1; pthread_t hThread2; if (pthread_create(&amp;hThread1, NULL, &amp;threadFunc1, NULL) != 0) { printf(\\"create thread 1 failed\\\\n\\"); return -1; } usleep(1000000); if (pthread_create(&amp;hThread2, NULL, &amp;threadFunc2, NULL) != 0) { printf(\\"create thread 2 failed\\\\n\\"); return -1; } pthread_join(hThread1, NULL); pthread_join(hThread2, NULL); pthread_rwlock_destroy(&amp;m_lock); return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-07T04:19:07.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-07T04:19:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux读写锁的死锁问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-07T04:19:07.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1696652347000,"updatedTime":1696652347000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":1.24,"words":371},"filePathRelative":"posts/Linux/application-dev/read-write-mutex-deadlock.md","localizedDate":"2023年10月7日","excerpt":"<h1> Linux读写锁的死锁问题</h1>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;pthread.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;unistd.h&gt;</span></span>\\n\\n\\npthread_rwlock_t m_lock<span class=\\"token punctuation\\">;</span>\\npthread_rwlockattr_t attr<span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">int</span> A <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> B <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">//线程1</span>\\n<span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> <span class=\\"token function\\">threadFunc1</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> p<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"thread 1 running..\\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">pthread_rwlock_rdlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"thread 1 read source A=%d\\\\n\\"</span><span class=\\"token punctuation\\">,</span> A<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">usleep</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3000000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 等待100ms，此时线程2大概率会被唤醒并申请写锁</span>\\n\\n  <span class=\\"token function\\">pthread_rwlock_rdlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"thread 1 read source B=%d\\\\n\\"</span><span class=\\"token punctuation\\">,</span> B<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token comment\\">//释放读锁</span>\\n  <span class=\\"token function\\">pthread_rwlock_unlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">pthread_rwlock_unlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">//线程2</span>\\n<span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> <span class=\\"token function\\">threadFunc2</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> p<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"thread 2 running..\\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">pthread_rwlock_wrlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  A <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  B <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"thread 2 write source A and B\\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token comment\\">//释放写锁</span>\\n  <span class=\\"token function\\">pthread_rwlock_unlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n\\n    <span class=\\"token function\\">pthread_rwlockattr_init</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>attr<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_rwlockattr_setkind_np</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>attr<span class=\\"token punctuation\\">,</span> PTHREAD_RWLOCK_PREFER_WRITER_NONRECURSIVE_NP<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//设置写锁优先级高</span>\\n\\n        <span class=\\"token comment\\">//初始化读写锁</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token function\\">pthread_rwlock_init</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">&amp;</span>attr<span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"init rwlock failed\\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token comment\\">//初始化线程</span>\\n  pthread_t hThread1<span class=\\"token punctuation\\">;</span>\\n  pthread_t hThread2<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token function\\">pthread_create</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>hThread1<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">&amp;</span>threadFunc1<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"create thread 1 failed\\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token function\\">usleep</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1000000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token function\\">pthread_create</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>hThread2<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">&amp;</span>threadFunc2<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"create thread 2 failed\\\\n\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token function\\">pthread_join</span><span class=\\"token punctuation\\">(</span>hThread1<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">pthread_join</span><span class=\\"token punctuation\\">(</span>hThread2<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token function\\">pthread_rwlock_destroy</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>m_lock<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
