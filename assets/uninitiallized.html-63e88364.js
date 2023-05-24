const t=JSON.parse('{"key":"v-93560ec4","path":"/posts/open_source_project/MyTinySTL/uninitiallized.html","title":"uninitialized","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","MyTinySTL"],"description":"uninitialized 分析 uninitialized_copy template &lt;class InputIter, class ForwardIter&gt; ForwardIter uninitialized_copy(InputIter first, InputIter last, ForwardIter result) { return mystl::unchecked_uninit_copy(first, last, result, std::is_trivially_copy_assignable&lt; typename iterator_traits&lt;ForwardIter&gt;:: value_type&gt;{}); }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/open_source_project/MyTinySTL/uninitiallized.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"uninitialized"}],["meta",{"property":"og:description","content":"uninitialized 分析 uninitialized_copy template &lt;class InputIter, class ForwardIter&gt; ForwardIter uninitialized_copy(InputIter first, InputIter last, ForwardIter result) { return mystl::unchecked_uninit_copy(first, last, result, std::is_trivially_copy_assignable&lt; typename iterator_traits&lt;ForwardIter&gt;:: value_type&gt;{}); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-24T10:03:05.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"MyTinySTL"}],["meta",{"property":"article:modified_time","content":"2023-05-24T10:03:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"uninitialized\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-24T10:03:05.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[{"level":3,"title":"uninitialized_copy","slug":"uninitialized-copy","link":"#uninitialized-copy","children":[]}]}],"git":{"createdTime":1684922585000,"updatedTime":1684922585000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.12,"words":35},"filePathRelative":"posts/open_source_project/MyTinySTL/uninitiallized.md","localizedDate":"2023年5月24日","excerpt":"<h1> uninitialized</h1>\\n<h2> 分析</h2>\\n<h3> uninitialized_copy</h3>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">InputIter</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ForwardIter</span><span class=\\"token operator\\">&gt;</span>\\nForwardIter <span class=\\"token function\\">uninitialized_copy</span><span class=\\"token punctuation\\">(</span>InputIter first<span class=\\"token punctuation\\">,</span> InputIter last<span class=\\"token punctuation\\">,</span> ForwardIter result<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> mystl<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">unchecked_uninit_copy</span><span class=\\"token punctuation\\">(</span>first<span class=\\"token punctuation\\">,</span> last<span class=\\"token punctuation\\">,</span> result<span class=\\"token punctuation\\">,</span> \\n                                     std<span class=\\"token double-colon punctuation\\">::</span>is_trivially_copy_assignable<span class=\\"token operator\\">&lt;</span>\\n                                     <span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">iterator_traits</span><span class=\\"token operator\\">&lt;</span>ForwardIter<span class=\\"token operator\\">&gt;</span><span class=\\"token double-colon punctuation\\">::</span>\\n                                     value_type<span class=\\"token operator\\">&gt;</span><span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
