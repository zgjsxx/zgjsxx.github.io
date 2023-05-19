const e=JSON.parse('{"key":"v-ca496d72","path":"/posts/Program_language/cpp/effective-cpp/effective-cpp-52.html","title":"effective c++ 52 写了placement new也要写placement delete","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 52 写了placement new也要写placement delete 分析 \\"placement new\\"通常是专指指定了位置的new(std::size_t size, void *mem)，用于vector申请capacity剩余的可用内存。 但广义的\\"placement new\\"指的是拥有额外参数的operator new。 new和delete是要成对的，因为当构造函数抛出异常时用户无法得到对象指针，因而delete的责任在于C++运行时。 运行时需要找到匹配的delete并进行调用。因此当我们编写了\\"placement new\\"时，也应当编写对应的\\"placement delete\\"， 否则会引起内存泄露。在编写自定义new和delete时，还要避免不小心隐藏它们的正常版本。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp/effective-cpp-52.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 52 写了placement new也要写placement delete"}],["meta",{"property":"og:description","content":"effective c++ 52 写了placement new也要写placement delete 分析 \\"placement new\\"通常是专指指定了位置的new(std::size_t size, void *mem)，用于vector申请capacity剩余的可用内存。 但广义的\\"placement new\\"指的是拥有额外参数的operator new。 new和delete是要成对的，因为当构造函数抛出异常时用户无法得到对象指针，因而delete的责任在于C++运行时。 运行时需要找到匹配的delete并进行调用。因此当我们编写了\\"placement new\\"时，也应当编写对应的\\"placement delete\\"， 否则会引起内存泄露。在编写自定义new和delete时，还要避免不小心隐藏它们的正常版本。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-17T06:23:55.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-17T06:23:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 52 写了placement new也要写placement delete\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-17T06:23:55.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1684304635000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":3.45,"words":1034},"filePathRelative":"posts/Program_language/cpp/effective-cpp/effective-cpp-52.md","localizedDate":"2023年5月11日","excerpt":"<h1> effective c++ 52 写了placement new也要写placement delete</h1>\\n<h2> 分析</h2>\\n<p>\\"placement new\\"通常是专指指定了位置的new(std::size_t size, void *mem)，用于vector申请capacity剩余的可用内存。 但广义的\\"placement new\\"指的是拥有额外参数的operator new。</p>\\n<p>new和delete是要成对的，因为当构造函数抛出异常时用户无法得到对象指针，因而delete的责任在于C++运行时。 运行时需要找到匹配的delete并进行调用。因此当我们编写了\\"placement new\\"时，也应当编写对应的\\"placement delete\\"， 否则会引起内存泄露。在编写自定义new和delete时，还要避免不小心隐藏它们的正常版本。</p>","autoDesc":true}');export{e as data};