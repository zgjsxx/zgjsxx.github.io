const e=JSON.parse('{"key":"v-bf0b1b8a","path":"/posts/Linux/application-dev/Linux-cpu-cache-mesi.html","title":"CPU缓存一致性原理","lang":"zh-CN","frontmatter":{"category":["Linux"],"description":"CPU缓存一致性原理 在本站的文章CPU缓存那些事儿中， 介绍了cpu的多级缓存的架构和cpu缓存行cacheline的结构。CPU对于缓存的操作包含读和写，读操作在cacheline中有所涉及，在本文中，将讨论CPU对于缓存进行写时的行为。 CPU对高速缓存的读操作 CPU对于高速缓存的写操作 写直达 写回策略 写操作带来的不一致问题 写缓冲区（Store Buffer） 由于在写入操作之前，CPU 核心 1 需要先广播 RFO 请求获得独占权，在其它核心回应 ACK 之前，当前核心只能空等待，这对 CPU 资源是一种浪费。因此，现代 CPU 会采用 “写缓冲区” 机制：写入指令放到写缓冲区后并发送 RFO 请求后，CPU 就可以去执行其它任务，等收到 ACK 后再将写入操作写到 Cache 上。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Linux/application-dev/Linux-cpu-cache-mesi.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"CPU缓存一致性原理"}],["meta",{"property":"og:description","content":"CPU缓存一致性原理 在本站的文章CPU缓存那些事儿中， 介绍了cpu的多级缓存的架构和cpu缓存行cacheline的结构。CPU对于缓存的操作包含读和写，读操作在cacheline中有所涉及，在本文中，将讨论CPU对于缓存进行写时的行为。 CPU对高速缓存的读操作 CPU对于高速缓存的写操作 写直达 写回策略 写操作带来的不一致问题 写缓冲区（Store Buffer） 由于在写入操作之前，CPU 核心 1 需要先广播 RFO 请求获得独占权，在其它核心回应 ACK 之前，当前核心只能空等待，这对 CPU 资源是一种浪费。因此，现代 CPU 会采用 “写缓冲区” 机制：写入指令放到写缓冲区后并发送 RFO 请求后，CPU 就可以去执行其它任务，等收到 ACK 后再将写入操作写到 Cache 上。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-08-14T09:47:47.000Z"}],["meta",{"property":"article:modified_time","content":"2023-08-14T09:47:47.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CPU缓存一致性原理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-08-14T09:47:47.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"CPU对高速缓存的读操作","slug":"cpu对高速缓存的读操作","link":"#cpu对高速缓存的读操作","children":[]},{"level":2,"title":"CPU对于高速缓存的写操作","slug":"cpu对于高速缓存的写操作","link":"#cpu对于高速缓存的写操作","children":[{"level":3,"title":"写直达","slug":"写直达","link":"#写直达","children":[]},{"level":3,"title":"写回策略","slug":"写回策略","link":"#写回策略","children":[]}]},{"level":2,"title":"写操作带来的不一致问题","slug":"写操作带来的不一致问题","link":"#写操作带来的不一致问题","children":[]}],"git":{"createdTime":1688367205000,"updatedTime":1692006467000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":11}]},"readingTime":{"minutes":1.23,"words":369},"filePathRelative":"posts/Linux/application-dev/Linux-cpu-cache-mesi.md","localizedDate":"2023年7月3日","excerpt":"<h1> CPU缓存一致性原理</h1>\\n<p>在本站的文章<strong>CPU缓存那些事儿</strong>中， 介绍了cpu的多级缓存的架构和cpu缓存行cacheline的结构。CPU对于缓存的操作包含读和写，读操作在cacheline中有所涉及，在本文中，将讨论CPU对于缓存进行写时的行为。</p>\\n<h2> CPU对高速缓存的读操作</h2>\\n<h2> CPU对于高速缓存的写操作</h2>\\n<h3> 写直达</h3>\\n<h3> 写回策略</h3>\\n<h2> 写操作带来的不一致问题</h2>\\n<p>写缓冲区（Store Buffer）</p>\\n<p>由于在写入操作之前，CPU 核心 1 需要先广播 RFO 请求获得独占权，在其它核心回应 ACK 之前，当前核心只能空等待，这对 CPU 资源是一种浪费。因此，现代 CPU 会采用 “写缓冲区” 机制：写入指令放到写缓冲区后并发送 RFO 请求后，CPU 就可以去执行其它任务，等收到 ACK 后再将写入操作写到 Cache 上。</p>","autoDesc":true}');export{e as data};
