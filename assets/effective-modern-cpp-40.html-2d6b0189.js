const e=JSON.parse('{"key":"v-5c64792c","path":"/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-40.html","title":"Item39: 对于并发使用std::atomic，对于特殊内存使用volatile","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["effective modern c++读书笔记"],"description":"Item39: 对于并发使用std::atomic，对于特殊内存使用volatile 总结： std::atomic用于在不使用互斥锁情况下，来使变量被多个线程访问的情况。是用来编写并发程序的一个工具。 volatile用在读取和写入不应被优化掉的内存上。是用来处理特殊内存的一个工具。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-40.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Item39: 对于并发使用std::atomic，对于特殊内存使用volatile"}],["meta",{"property":"og:description","content":"Item39: 对于并发使用std::atomic，对于特殊内存使用volatile 总结： std::atomic用于在不使用互斥锁情况下，来使变量被多个线程访问的情况。是用来编写并发程序的一个工具。 volatile用在读取和写入不应被优化掉的内存上。是用来处理特殊内存的一个工具。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T07:03:43.000Z"}],["meta",{"property":"article:tag","content":"effective modern c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-11T07:03:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Item39: 对于并发使用std::atomic，对于特殊内存使用volatile\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T07:03:43.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结：","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1683788623000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":0.35,"words":104},"filePathRelative":"posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-40.md","localizedDate":"2023年5月11日","excerpt":"<h1> Item39: 对于并发使用std::atomic，对于特殊内存使用volatile</h1>\\n<h2> 总结：</h2>\\n<ul>\\n<li>std::atomic用于在不使用互斥锁情况下，来使变量被多个线程访问的情况。是用来编写并发程序的一个工具。</li>\\n<li>volatile用在读取和写入不应被优化掉的内存上。是用来处理特殊内存的一个工具。</li>\\n</ul>\\n","autoDesc":true}');export{e as data};
