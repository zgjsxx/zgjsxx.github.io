const t=JSON.parse('{"key":"v-1ac7d2e2","path":"/posts/Linux/application-dev/linux-mutex-futex.html","title":"深入了解glibc的互斥锁","lang":"zh-CN","frontmatter":{"category":["Linux"],"description":"深入了解glibc的互斥锁 互斥锁是多线程同步时常用的手段，使用互斥锁可以保护对共享资源的操作。 共享资源也被称为临界区，当一个线程对一个临界区加锁后，其他线程就不能进入该临界区，直到持有临界区锁的线程释放该锁。 本文以glibc中mutex的实现为例，讲解其背后的实现原理。 glibc mutex类型 glibc的互斥锁的类型名称为pthread_mutex_t，其结构可以用下面的结构体表示： typedef struct { int lock; int count; int owner; int nusers; int kind; // other ignore } pthread_mutex_t;","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/application-dev/linux-mutex-futex.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"深入了解glibc的互斥锁"}],["meta",{"property":"og:description","content":"深入了解glibc的互斥锁 互斥锁是多线程同步时常用的手段，使用互斥锁可以保护对共享资源的操作。 共享资源也被称为临界区，当一个线程对一个临界区加锁后，其他线程就不能进入该临界区，直到持有临界区锁的线程释放该锁。 本文以glibc中mutex的实现为例，讲解其背后的实现原理。 glibc mutex类型 glibc的互斥锁的类型名称为pthread_mutex_t，其结构可以用下面的结构体表示： typedef struct { int lock; int count; int owner; int nusers; int kind; // other ignore } pthread_mutex_t;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-28T03:09:12.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-28T03:09:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"深入了解glibc的互斥锁\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-28T03:09:12.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"glibc mutex类型","slug":"glibc-mutex类型","link":"#glibc-mutex类型","children":[]},{"level":2,"title":"mutex的加锁过程","slug":"mutex的加锁过程","link":"#mutex的加锁过程","children":[]},{"level":2,"title":"sys_futex","slug":"sys-futex","link":"#sys-futex","children":[]}],"git":{"createdTime":1687836581000,"updatedTime":1687921752000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":5}]},"readingTime":{"minutes":4.35,"words":1304},"filePathRelative":"posts/Linux/application-dev/linux-mutex-futex.md","localizedDate":"2023年6月27日","excerpt":"<h1> 深入了解glibc的互斥锁</h1>\\n<p>互斥锁是<strong>多线程</strong>同步时常用的手段，使用互斥锁可以保护对共享资源的操作。 共享资源也被称为<strong>临界区</strong>，当一个线程对一个临界区加锁后，其他线程就不能进入该临界区，直到持有临界区锁的线程释放该锁。</p>\\n<p>本文以glibc中mutex的实现为例，讲解其背后的实现原理。</p>\\n<h2> glibc mutex类型</h2>\\n<p>glibc的互斥锁的类型名称为pthread_mutex_t，其结构可以用下面的结构体表示：</p>\\n<div class=\\"language-c line-numbers-mode\\" data-ext=\\"c\\"><pre class=\\"language-c\\"><code><span class=\\"token keyword\\">typedef</span> <span class=\\"token keyword\\">struct</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">int</span> lock<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> count<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> owner<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> nusers<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> kind<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">// other ignore</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token class-name\\">pthread_mutex_t</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
