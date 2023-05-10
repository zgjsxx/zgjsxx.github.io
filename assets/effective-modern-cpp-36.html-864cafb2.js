const t=JSON.parse('{"key":"v-7dfc44b7","path":"/posts/Program_language/cpp/effective-modern-cpp-36.html","title":"Item36：如果有异步的必要请指定std::launch::async","lang":"zh-CN","frontmatter":{"category":["C++","effective Modern C++"],"description":"Item36：如果有异步的必要请指定std::launch::async 总结 std::async的默认启动策略是异步和同步执行兼有的。 这个灵活性导致访问thread_locals的不确定性，隐含了任务可能不会被执行的意思，会影响调用基于超时的wait的程序逻辑。 如果异步执行任务非常关键，则指定std::launch::async。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-modern-cpp-36.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Item36：如果有异步的必要请指定std::launch::async"}],["meta",{"property":"og:description","content":"Item36：如果有异步的必要请指定std::launch::async 总结 std::async的默认启动策略是异步和同步执行兼有的。 这个灵活性导致访问thread_locals的不确定性，隐含了任务可能不会被执行的意思，会影响调用基于超时的wait的程序逻辑。 如果异步执行任务非常关键，则指定std::launch::async。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T06:43:39.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-08T06:43:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Item36：如果有异步的必要请指定std::launch::async\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-08T06:43:39.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683178762000,"updatedTime":1683528219000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":2}]},"readingTime":{"minutes":0.35,"words":106},"filePathRelative":"posts/Program_language/cpp/effective-modern-cpp-36.md","localizedDate":"2023年5月4日","excerpt":"<h1> Item36：如果有异步的必要请指定std::launch::async</h1>\\n<h2> 总结</h2>\\n<ul>\\n<li>std::async的默认启动策略是异步和同步执行兼有的。</li>\\n<li>这个灵活性导致访问thread_locals的不确定性，隐含了任务可能不会被执行的意思，会影响调用基于超时的wait的程序逻辑。</li>\\n<li>如果异步执行任务非常关键，则指定std::launch::async。</li>\\n</ul>\\n","autoDesc":true}');export{t as data};