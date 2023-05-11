const t=JSON.parse('{"key":"v-518f27a8","path":"/posts/open_source_project/MyTinySTL/construct.html","title":"construct","lang":"zh-CN","frontmatter":{"description":"category: C++ tag: C++ MyTinySTL construct construct construct有多个重载的模板。 下面这个版本是调用全局的placement new操作符调用无参构造函数构造对象。 template &lt;class Ty&gt; void construct(Ty* ptr) { ::new ((void*)ptr) Ty(); }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/open_source_project/MyTinySTL/construct.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"construct"}],["meta",{"property":"og:description","content":"category: C++ tag: C++ MyTinySTL construct construct construct有多个重载的模板。 下面这个版本是调用全局的placement new操作符调用无参构造函数构造对象。 template &lt;class Ty&gt; void construct(Ty* ptr) { ::new ((void*)ptr) Ty(); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-11T07:29:57.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-11T07:29:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"construct\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-11T07:29:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"construct","slug":"construct-1","link":"#construct-1","children":[]}],"git":{"createdTime":1683790197000,"updatedTime":1683790197000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.4,"words":121},"filePathRelative":"posts/open_source_project/MyTinySTL/construct.md","localizedDate":"2023年5月11日","excerpt":"<hr>\\n<p>category:</p>\\n<ul>\\n<li>C++\\ntag:</li>\\n<li>C++</li>\\n<li>MyTinySTL</li>\\n</ul>\\n<hr>\\n<h1> construct</h1>\\n<h2> construct</h2>\\n<p>construct有多个重载的模板。</p>\\n<p>下面这个版本是调用全局的placement new操作符调用无参构造函数构造对象。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Ty</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">construct</span><span class=\\"token punctuation\\">(</span>Ty<span class=\\"token operator\\">*</span> ptr<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token double-colon punctuation\\">::</span><span class=\\"token keyword\\">new</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span>ptr<span class=\\"token punctuation\\">)</span> <span class=\\"token function\\">Ty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
