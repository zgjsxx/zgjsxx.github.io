const e=JSON.parse('{"key":"v-7ec37033","path":"/posts/Program_language/cpp/effective-cpp-25.html","title":"effective c++ 25 考虑写一个不抛出任何异常的swap函数","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 25 考虑写一个不抛出任何异常的swap函数 总结 当std::swap对你的类型效率不高时，提供一个swap成员函数，并确定函数不抛出异常 如果你提供一个member swap， 也该提供一个non-member swap用来调用前者。 调用swap时应针对std::swap使用using 声明式， 然后调用swao并且不带任何\\"命名空间资格修饰\\" 为\\"用户定义类型\\"进行std template全特化时好的，但千万不要尝试在std内加入某些std而言全新的东西。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp-25.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 25 考虑写一个不抛出任何异常的swap函数"}],["meta",{"property":"og:description","content":"effective c++ 25 考虑写一个不抛出任何异常的swap函数 总结 当std::swap对你的类型效率不高时，提供一个swap成员函数，并确定函数不抛出异常 如果你提供一个member swap， 也该提供一个non-member swap用来调用前者。 调用swap时应针对std::swap使用using 声明式， 然后调用swao并且不带任何\\"命名空间资格修饰\\" 为\\"用户定义类型\\"进行std template全特化时好的，但千万不要尝试在std内加入某些std而言全新的东西。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T05:45:44.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-08T05:45:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 25 考虑写一个不抛出任何异常的swap函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-08T05:45:44.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683524744000,"updatedTime":1683524744000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.53,"words":160},"filePathRelative":"posts/Program_language/cpp/effective-cpp-25.md","localizedDate":"2023年5月8日","excerpt":"<h1> effective c++ 25 考虑写一个不抛出任何异常的swap函数</h1>\\n<h2> 总结</h2>\\n<ul>\\n<li>当std::swap对你的类型效率不高时，提供一个swap成员函数，并确定函数不抛出异常</li>\\n<li>如果你提供一个member swap， 也该提供一个non-member swap用来调用前者。</li>\\n<li>调用swap时应针对std::swap使用using 声明式， 然后调用swao并且不带任何\\"命名空间资格修饰\\"</li>\\n<li>为\\"用户定义类型\\"进行std template全特化时好的，但千万不要尝试在std内加入某些std而言全新的东西。</li>\\n</ul>","autoDesc":true}');export{e as data};
