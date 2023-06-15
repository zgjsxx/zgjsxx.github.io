const t=JSON.parse('{"key":"v-518f27a8","path":"/posts/open_source_project/MyTinySTL/construct.html","title":"construct","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","MyTinySTL"],"description":"construct 分析 construct construct有多个重载的模板。 下面这个版本是调用全局的placement new操作符调用无参构造函数构造对象。 template &lt;class Ty&gt; void construct(Ty* ptr) { ::new ((void*)ptr) Ty(); }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/open_source_project/MyTinySTL/construct.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"construct"}],["meta",{"property":"og:description","content":"construct 分析 construct construct有多个重载的模板。 下面这个版本是调用全局的placement new操作符调用无参构造函数构造对象。 template &lt;class Ty&gt; void construct(Ty* ptr) { ::new ((void*)ptr) Ty(); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-24T10:03:05.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"MyTinySTL"}],["meta",{"property":"article:modified_time","content":"2023-05-24T10:03:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"construct\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-24T10:03:05.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[{"level":3,"title":"construct","slug":"construct-1","link":"#construct-1","children":[]}]}],"git":{"createdTime":1683790197000,"updatedTime":1684922585000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":3}]},"readingTime":{"minutes":0.41,"words":123},"filePathRelative":"posts/open_source_project/MyTinySTL/construct.md","localizedDate":"2023年5月11日","excerpt":"<h1> construct</h1>\\n<h2> 分析</h2>\\n<h3> construct</h3>\\n<p>construct有多个重载的模板。</p>\\n<p>下面这个版本是调用全局的placement new操作符调用无参构造函数构造对象。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Ty</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">construct</span><span class=\\"token punctuation\\">(</span>Ty<span class=\\"token operator\\">*</span> ptr<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token double-colon punctuation\\">::</span><span class=\\"token keyword\\">new</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">void</span><span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span>ptr<span class=\\"token punctuation\\">)</span> <span class=\\"token function\\">Ty</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};