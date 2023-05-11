const e=JSON.parse('{"key":"v-606ad144","path":"/posts/Program_language/cpp/effective-cpp/effective-cpp-17.html","title":"effective c++ 17 独立语句将newed对象置入智能指针","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 17 独立语句将newed对象置入智能指针 智能指针可以帮助用户更好的管理资源，避免资源泄露。但是如果使用不当，还是可能出现资源泄露。本文便是讲解了智能指针使用不当可能出现资源泄漏的一个场景。 考虑下面的函数： processWidget(std::tr1::shared_ptr&lt;Widget&gt;(new Widget), priority());","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp/effective-cpp-17.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 17 独立语句将newed对象置入智能指针"}],["meta",{"property":"og:description","content":"effective c++ 17 独立语句将newed对象置入智能指针 智能指针可以帮助用户更好的管理资源，避免资源泄露。但是如果使用不当，还是可能出现资源泄露。本文便是讲解了智能指针使用不当可能出现资源泄漏的一个场景。 考虑下面的函数： processWidget(std::tr1::shared_ptr&lt;Widget&gt;(new Widget), priority());"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T06:58:32.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-11T06:58:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 17 独立语句将newed对象置入智能指针\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T06:58:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1683788312000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.81,"words":243},"filePathRelative":"posts/Program_language/cpp/effective-cpp/effective-cpp-17.md","localizedDate":"2023年5月11日","excerpt":"<h1> effective c++ 17 独立语句将newed对象置入智能指针</h1>\\n<p>智能指针可以帮助用户更好的管理资源，避免资源泄露。但是如果使用不当，还是可能出现资源泄露。本文便是讲解了智能指针使用不当可能出现资源泄漏的一个场景。</p>\\n<p>考虑下面的函数：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token function\\">processWidget</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span>tr1<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">shared_ptr</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>Widget<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> Widget<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">priority</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};
