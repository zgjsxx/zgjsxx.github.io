const e=JSON.parse('{"key":"v-717b477a","path":"/posts/Program_language/cpp/effective-cpp/effective-cpp-12.html","title":"effective c++ 12 复制对象时勿忘其每一个成分","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 12 复制对象时勿忘其每一个成分 总结 copying函数应该确保复制\\"对象内的所有成员变量\\"以及\\"所有base class成分\\"。 不要尝试以一个copying 函数去实现另一个copying函数。应该将共同机能放进第三个函数中，并又两个copying函数共同调用。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp/effective-cpp-12.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 12 复制对象时勿忘其每一个成分"}],["meta",{"property":"og:description","content":"effective c++ 12 复制对象时勿忘其每一个成分 总结 copying函数应该确保复制\\"对象内的所有成员变量\\"以及\\"所有base class成分\\"。 不要尝试以一个copying 函数去实现另一个copying函数。应该将共同机能放进第三个函数中，并又两个copying函数共同调用。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T06:58:32.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-11T06:58:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 12 复制对象时勿忘其每一个成分\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T06:58:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1683788312000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.33,"words":100},"filePathRelative":"posts/Program_language/cpp/effective-cpp/effective-cpp-12.md","localizedDate":"2023年5月11日","excerpt":"<h1> effective c++ 12 复制对象时勿忘其每一个成分</h1>\\n<h2> 总结</h2>\\n<ul>\\n<li>copying函数应该确保复制\\"对象内的所有成员变量\\"以及\\"所有base class成分\\"。</li>\\n<li>不要尝试以一个copying 函数去实现另一个copying函数。应该将共同机能放进第三个函数中，并又两个copying函数共同调用。</li>\\n</ul>\\n","autoDesc":true}');export{e as data};
