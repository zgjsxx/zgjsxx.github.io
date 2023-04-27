const e=JSON.parse('{"key":"v-0fd86fd4","path":"/posts/Program_language/cpp/effective-cpp-02.html","title":"effective c++ 02-尽量以 const，enum，inline 替换 #define","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 02-尽量以 const，enum，inline 替换 #define 题干中使用了尽量二字，说明#define并非一无是处，只不过#define对开发者使用上要求较高，用不好的话出现问题，查错调试的成本较大。 这里主要从两个角度阐述如何替代define： 如何替代define定义常量？ 如何替代define定义宏函数？ 如何替代define定义常量 如何替代define定义宏函数 #define定义宏函数对开发者要求较高，一不小心就可能带来意想不到的错误。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp-02.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 02-尽量以 const，enum，inline 替换 #define"}],["meta",{"property":"og:description","content":"effective c++ 02-尽量以 const，enum，inline 替换 #define 题干中使用了尽量二字，说明#define并非一无是处，只不过#define对开发者使用上要求较高，用不好的话出现问题，查错调试的成本较大。 这里主要从两个角度阐述如何替代define： 如何替代define定义常量？ 如何替代define定义宏函数？ 如何替代define定义常量 如何替代define定义宏函数 #define定义宏函数对开发者要求较高，一不小心就可能带来意想不到的错误。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-25T02:52:00.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-04-25T02:52:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 02-尽量以 const，enum，inline 替换 #define\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-25T02:52:00.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"如何替代define定义常量","slug":"如何替代define定义常量","link":"#如何替代define定义常量","children":[]},{"level":2,"title":"如何替代define定义宏函数","slug":"如何替代define定义宏函数","link":"#如何替代define定义宏函数","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1682391120000,"updatedTime":1682391120000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":1.23,"words":368},"filePathRelative":"posts/Program_language/cpp/effective-cpp-02.md","localizedDate":"2023年4月25日","excerpt":"<h1> effective c++ 02-尽量以 const，enum，inline 替换 #define</h1>\\n<p>题干中使用了<strong>尽量</strong>二字，说明#define并非一无是处，只不过#define对开发者使用上要求较高，用不好的话出现问题，查错调试的成本较大。</p>\\n<p>这里主要从两个角度阐述如何替代define：</p>\\n<ul>\\n<li>如何替代define定义常量？</li>\\n<li>如何替代define定义宏函数？</li>\\n</ul>\\n<h2> 如何替代define定义常量</h2>\\n<h2> 如何替代define定义宏函数</h2>\\n<p>#define定义宏函数对开发者要求较高，一不小心就可能带来意想不到的错误。</p>","autoDesc":true}');export{e as data};