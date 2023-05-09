const t=JSON.parse('{"key":"v-7fb11d56","path":"/posts/Program_language/cpp/effective-modern-cpp-37.html","title":"Item37：使std::thread在所有路径最后都不可结合","lang":"zh-CN","frontmatter":{"category":["C++","effective Modern C++"],"description":"Item37：使std::thread在所有路径最后都不可结合 每个std::thread对象处于两个状态之一：可结合的（joinable）或者不可结合的（unjoinable）。可结合状态的std::thread对应于正在运行或者可能要运行的异步执行线程。比如，对应于一个阻塞的（blocked）或者等待调度的线程的std::thread是可结合的，对应于运行结束的线程的std::thread也可以认为是可结合的。 不可结合的std::thread正如所期待：一个不是可结合状态的std::thread。不可结合的std::thread对象包括：","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-modern-cpp-37.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"Item37：使std::thread在所有路径最后都不可结合"}],["meta",{"property":"og:description","content":"Item37：使std::thread在所有路径最后都不可结合 每个std::thread对象处于两个状态之一：可结合的（joinable）或者不可结合的（unjoinable）。可结合状态的std::thread对应于正在运行或者可能要运行的异步执行线程。比如，对应于一个阻塞的（blocked）或者等待调度的线程的std::thread是可结合的，对应于运行结束的线程的std::thread也可以认为是可结合的。 不可结合的std::thread正如所期待：一个不是可结合状态的std::thread。不可结合的std::thread对象包括："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-09T09:42:07.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-09T09:42:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Item37：使std::thread在所有路径最后都不可结合\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-09T09:42:07.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683625327000,"updatedTime":1683625327000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":10.48,"words":3143},"filePathRelative":"posts/Program_language/cpp/effective-modern-cpp-37.md","localizedDate":"2023年5月9日","excerpt":"<h1> Item37：使std::thread在所有路径最后都不可结合</h1>\\n<p>每个<code>std::thread</code>对象处于两个状态之一：可结合的（joinable）或者不可结合的（unjoinable）。可结合状态的std::thread对应于正在运行或者可能要运行的异步执行线程。比如，对应于一个阻塞的（blocked）或者等待调度的线程的std::thread是可结合的，对应于运行结束的线程的std::thread也可以认为是可结合的。</p>\\n<p>不可结合的<code>std::thread</code>正如所期待：一个不是可结合状态的<code>std::thread</code>。不可结合的<code>std::thread</code>对象包括：</p>","autoDesc":true}');export{t as data};
