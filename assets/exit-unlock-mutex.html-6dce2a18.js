const n=JSON.parse('{"key":"v-f8c6564a","path":"/posts/Linux/application-dev/exit-unlock-mutex.html","title":"如果持有互斥锁的线程没有解锁退出了，该如何处理？","lang":"zh-CN","frontmatter":{"category":["Linux"],"tags":["操作系统面试题"],"description":"如果持有互斥锁的线程没有解锁退出了，该如何处理？ 问题引入 看下面一段代码，两个线程将竞争互斥锁mutex而进入临界区， 线程2在竞争互斥锁之前会sleep 2秒， 因此大概率线程1将获得互斥锁。 然而线程1执行完临界区的代码之后， 没有执行解锁操作，就退出了。 这样会导致线程2将死锁，因为该锁的状态将永远是锁定状态， 它将永远都不能获得锁。 #include&lt;unistd.h&gt; #include&lt;sys/mman.h&gt; #include&lt;pthread.h&gt; #include&lt;sys/types.h&gt; #include&lt;sys/wait.h&gt; #include&lt;fcntl.h&gt; #include&lt;string.h&gt; #include&lt;stdlib.h&gt; #include&lt;stdio.h&gt; #include &lt;string&gt; #include &lt;iostream&gt; using namespace std; pthread_mutex_t mutex; void* func1(void* param) { pthread_mutex_lock(&amp;mutex); cout &lt;&lt; \\"func1 get lock\\" &lt;&lt; endl; pthread_exit(NULL); } void* func2(void* param) { sleep(2); pthread_mutex_lock(&amp;mutex); cout &lt;&lt; \\"func2 get lock\\" &lt;&lt; endl; pthread_mutex_unlock(&amp;mutex); return NULL; } int main(void) { int i; pthread_mutex_init(&amp;mutex, NULL); pthread_t tid1, tid2; pthread_create(&amp;tid1, NULL, func1, NULL); pthread_create(&amp;tid2, NULL, func2, NULL); pthread_join(tid1,NULL); pthread_join(tid2,NULL); pthread_mutex_destroy(&amp;mutex); return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/application-dev/exit-unlock-mutex.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"如果持有互斥锁的线程没有解锁退出了，该如何处理？"}],["meta",{"property":"og:description","content":"如果持有互斥锁的线程没有解锁退出了，该如何处理？ 问题引入 看下面一段代码，两个线程将竞争互斥锁mutex而进入临界区， 线程2在竞争互斥锁之前会sleep 2秒， 因此大概率线程1将获得互斥锁。 然而线程1执行完临界区的代码之后， 没有执行解锁操作，就退出了。 这样会导致线程2将死锁，因为该锁的状态将永远是锁定状态， 它将永远都不能获得锁。 #include&lt;unistd.h&gt; #include&lt;sys/mman.h&gt; #include&lt;pthread.h&gt; #include&lt;sys/types.h&gt; #include&lt;sys/wait.h&gt; #include&lt;fcntl.h&gt; #include&lt;string.h&gt; #include&lt;stdlib.h&gt; #include&lt;stdio.h&gt; #include &lt;string&gt; #include &lt;iostream&gt; using namespace std; pthread_mutex_t mutex; void* func1(void* param) { pthread_mutex_lock(&amp;mutex); cout &lt;&lt; \\"func1 get lock\\" &lt;&lt; endl; pthread_exit(NULL); } void* func2(void* param) { sleep(2); pthread_mutex_lock(&amp;mutex); cout &lt;&lt; \\"func2 get lock\\" &lt;&lt; endl; pthread_mutex_unlock(&amp;mutex); return NULL; } int main(void) { int i; pthread_mutex_init(&amp;mutex, NULL); pthread_t tid1, tid2; pthread_create(&amp;tid1, NULL, func1, NULL); pthread_create(&amp;tid2, NULL, func2, NULL); pthread_join(tid1,NULL); pthread_join(tid2,NULL); pthread_mutex_destroy(&amp;mutex); return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-04T03:33:11.000Z"}],["meta",{"property":"article:tag","content":"操作系统面试题"}],["meta",{"property":"article:modified_time","content":"2023-04-04T03:33:11.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"如果持有互斥锁的线程没有解锁退出了，该如何处理？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-04T03:33:11.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"问题引入","slug":"问题引入","link":"#问题引入","children":[]},{"level":2,"title":"PTHREAD_MUTEX_ROBUST 和  pthread_mutex_consistent登场了","slug":"pthread-mutex-robust-和-pthread-mutex-consistent登场了","link":"#pthread-mutex-robust-和-pthread-mutex-consistent登场了","children":[]},{"level":2,"title":"结论：","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1680579191000,"updatedTime":1680579191000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":3.03,"words":908},"filePathRelative":"posts/Linux/application-dev/exit-unlock-mutex.md","localizedDate":"2023年4月4日","excerpt":"<h1> 如果持有互斥锁的线程没有解锁退出了，该如何处理？</h1>\\n<h2> 问题引入</h2>\\n<p>看下面一段代码，两个线程将竞争互斥锁mutex而进入临界区， 线程2在竞争互斥锁之前会sleep 2秒， 因此大概率线程1将获得互斥锁。 然而线程1执行完临界区的代码之后， 没有执行解锁操作，就退出了。</p>\\n<p>这样会导致线程2将死锁，因为该锁的状态将永远是锁定状态， 它将永远都不能获得锁。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;unistd.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;sys/mman.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;pthread.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;sys/types.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;sys/wait.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;fcntl.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;string.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;stdlib.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span><span class=\\"token string\\">&lt;stdio.h&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;string&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token keyword\\">using</span> <span class=\\"token keyword\\">namespace</span> std<span class=\\"token punctuation\\">;</span>\\npthread_mutex_t mutex<span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> <span class=\\"token function\\">func1</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> param<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">pthread_mutex_lock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>mutex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"func1 get lock\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_exit</span><span class=\\"token punctuation\\">(</span><span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> <span class=\\"token function\\">func2</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span> param<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">sleep</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_mutex_lock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>mutex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"func2 get lock\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> endl<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_mutex_unlock</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>mutex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> i<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_mutex_init</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>mutex<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    pthread_t tid1<span class=\\"token punctuation\\">,</span> tid2<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_create</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>tid1<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">,</span> func1<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_create</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>tid2<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">,</span> func2<span class=\\"token punctuation\\">,</span> <span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token function\\">pthread_join</span><span class=\\"token punctuation\\">(</span>tid1<span class=\\"token punctuation\\">,</span><span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_join</span><span class=\\"token punctuation\\">(</span>tid2<span class=\\"token punctuation\\">,</span><span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">pthread_mutex_destroy</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">&amp;</span>mutex<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
