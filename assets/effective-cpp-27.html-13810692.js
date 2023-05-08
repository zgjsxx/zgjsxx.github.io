const e=JSON.parse('{"key":"v-fba5bd1e","path":"/posts/Program_language/cpp/effective-cpp-27.html","title":"effective c++ 27 尽量少做转型动作","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 27 尽量少做转型动作 总结 如果可以，尽量避免转型，特别是在注重效率的代码中避免dynamic_casts。如果有个别设计需要转型动作，试着发展无需转型的替代设计。 如果转型是必要的，试着将它隐藏于某个函数背后。客户随后可以调用该函数，而不需要将转型放进他们自己的代码内。 宁可使用c++style新式转型，不要使用旧式转型，前者很容易辨识出来，而且也比较有着分门别类的职掌。","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp-27.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 27 尽量少做转型动作"}],["meta",{"property":"og:description","content":"effective c++ 27 尽量少做转型动作 总结 如果可以，尽量避免转型，特别是在注重效率的代码中避免dynamic_casts。如果有个别设计需要转型动作，试着发展无需转型的替代设计。 如果转型是必要的，试着将它隐藏于某个函数背后。客户随后可以调用该函数，而不需要将转型放进他们自己的代码内。 宁可使用c++style新式转型，不要使用旧式转型，前者很容易辨识出来，而且也比较有着分门别类的职掌。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-08T09:59:08.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-08T09:59:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 27 尽量少做转型动作\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-08T09:59:08.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683539948000,"updatedTime":1683539948000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.55,"words":164},"filePathRelative":"posts/Program_language/cpp/effective-cpp-27.md","localizedDate":"2023年5月8日","excerpt":"<h1> effective c++ 27 尽量少做转型动作</h1>\\n<h2> 总结</h2>\\n<ul>\\n<li>如果可以，尽量避免转型，特别是在注重效率的代码中避免dynamic_casts。如果有个别设计需要转型动作，试着发展无需转型的替代设计。</li>\\n<li>如果转型是必要的，试着将它隐藏于某个函数背后。客户随后可以调用该函数，而不需要将转型放进他们自己的代码内。</li>\\n<li>宁可使用c++style新式转型，不要使用旧式转型，前者很容易辨识出来，而且也比较有着分门别类的职掌。</li>\\n</ul>\\n","autoDesc":true}');export{e as data};
