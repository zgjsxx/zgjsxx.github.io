const e=JSON.parse('{"key":"v-37e23541","path":"/posts/Program_language/cpp/effective-cpp/effective-cpp-36.html","title":"effective c++ 36 绝不重新定义继承而来的non-virtual函数","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective c++读书笔记"],"description":"effective c++ 36 绝不重新定义继承而来的non-virtual函数 该条款比较简单，只需记住就可以。该条款和item33是相辅相成的。 分析 如下所示，如果在D内重新定义mf， 那么D就将基类中的mf给隐藏了。该条款是不建议这样做的，因为public继承是is-a的关系，D的对象也是一种B的对象，其mf方法里应该相同。 class B { public: \\tvoid mf() \\t{ \\t} }; class D : public B { public: \\t// hides B::mf() - Item33 \\tvoid mf() \\t{ \\t} };","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-cpp/effective-cpp-36.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective c++ 36 绝不重新定义继承而来的non-virtual函数"}],["meta",{"property":"og:description","content":"effective c++ 36 绝不重新定义继承而来的non-virtual函数 该条款比较简单，只需记住就可以。该条款和item33是相辅相成的。 分析 如下所示，如果在D内重新定义mf， 那么D就将基类中的mf给隐藏了。该条款是不建议这样做的，因为public继承是is-a的关系，D的对象也是一种B的对象，其mf方法里应该相同。 class B { public: \\tvoid mf() \\t{ \\t} }; class D : public B { public: \\t// hides B::mf() - Item33 \\tvoid mf() \\t{ \\t} };"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-16T02:22:54.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective c++读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-16T02:22:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective c++ 36 绝不重新定义继承而来的non-virtual函数\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-16T02:22:54.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683788312000,"updatedTime":1684203774000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":0.54,"words":162},"filePathRelative":"posts/Program_language/cpp/effective-cpp/effective-cpp-36.md","localizedDate":"2023年5月11日","excerpt":"<h1> effective c++ 36 绝不重新定义继承而来的non-virtual函数</h1>\\n<p>该条款比较简单，只需记住就可以。该条款和item33是相辅相成的。</p>\\n<h2> 分析</h2>\\n<p>如下所示，如果在D内重新定义mf， 那么D就将基类中的mf给隐藏了。该条款是不建议这样做的，因为public继承是is-a的关系，D的对象也是一种B的对象，其mf方法里应该相同。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">B</span>\\n<span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n\\t<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">mf</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\t<span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">D</span> <span class=\\"token operator\\">:</span> <span class=\\"token base-clause\\"><span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">B</span></span>\\n<span class=\\"token punctuation\\">{</span>\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n\\t<span class=\\"token comment\\">// hides B::mf() - Item33</span>\\n\\t<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">mf</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n\\t<span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};