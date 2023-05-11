const e=JSON.parse('{"key":"v-33702a44","path":"/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-37.html","title":"Item37：使std::thread在所有路径最后都不可结合（unjoinable）","lang":"zh-CN","frontmatter":{"category":["C++","effective Modern C++"],"description":"Item37：使std::thread在所有路径最后都不可结合（unjoinable） 如果一个线程没有被detach，那么必须确保线程在合适的时间都被join回收资源。而被detach过的线程，则会在线程执行完毕后自动释放资源(pthread结构体和栈)。使std::thread在所有路径最后都unjoinable就意味着我们需要确保线程执行完毕后释放了其占用的资源。 每个std::thread对象处于两个状态之一：可结合的（joinable）或者不可结合的（unjoinable）。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-37.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Item37：使std::thread在所有路径最后都不可结合（unjoinable）"}],["meta",{"property":"og:description","content":"Item37：使std::thread在所有路径最后都不可结合（unjoinable） 如果一个线程没有被detach，那么必须确保线程在合适的时间都被join回收资源。而被detach过的线程，则会在线程执行完毕后自动释放资源(pthread结构体和栈)。使std::thread在所有路径最后都unjoinable就意味着我们需要确保线程执行完毕后释放了其占用的资源。 每个std::thread对象处于两个状态之一：可结合的（joinable）或者不可结合的（unjoinable）。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T06:58:32.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-11T06:58:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Item37：使std::thread在所有路径最后都不可结合（unjoinable）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T06:58:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1683788312000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":8.99,"words":2698},"filePathRelative":"posts/Program_language/cpp/effective-modern-cpp/effective-modern-cpp-37.md","localizedDate":"2023年5月11日","excerpt":"<h1> Item37：使std::thread在所有路径最后都不可结合（unjoinable）</h1>\\n<p>如果一个线程没有被detach，那么必须确保线程在合适的时间都被join回收资源。而被detach过的线程，则会在线程执行完毕后自动释放资源(pthread结构体和栈)。使<code>std::thread</code>在所有路径最后都unjoinable就意味着我们需要确保线程执行完毕后释放了其占用的资源。</p>\\n<p>每个<code>std::thread</code>对象处于两个状态之一：<strong>可结合的（joinable）<strong>或者</strong>不可结合的（unjoinable）</strong>。</p>","autoDesc":true}');export{e as data};
