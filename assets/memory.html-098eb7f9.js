const e=JSON.parse('{"key":"v-2bd87fee","path":"/posts/open_source_project/MyTinySTL/memory.html","title":"memory","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","MyTinySTL"],"description":"memory 分析 address_of 该函数的作用是获取value的地址。但是该实现可能并不正确，当Tp类型重载了&amp;运算符时，下面的实现就不能取到真时的地址。 可以考虑使用std::addressof解决。 // 获取对象地址 template &lt;class Tp&gt; constexpr Tp* address_of(Tp&amp; value) noexcept { return &amp;value; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/open_source_project/MyTinySTL/memory.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"memory"}],["meta",{"property":"og:description","content":"memory 分析 address_of 该函数的作用是获取value的地址。但是该实现可能并不正确，当Tp类型重载了&amp;运算符时，下面的实现就不能取到真时的地址。 可以考虑使用std::addressof解决。 // 获取对象地址 template &lt;class Tp&gt; constexpr Tp* address_of(Tp&amp; value) noexcept { return &amp;value; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-25T06:02:03.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"MyTinySTL"}],["meta",{"property":"article:modified_time","content":"2023-05-25T06:02:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"memory\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-25T06:02:03.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[{"level":3,"title":"address_of","slug":"address-of","link":"#address-of","children":[]}]}],"git":{"createdTime":1684994523000,"updatedTime":1684994523000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.29,"words":87},"filePathRelative":"posts/open_source_project/MyTinySTL/memory.md","localizedDate":"2023年5月25日","excerpt":"<h1> memory</h1>\\n<h2> 分析</h2>\\n<h3> address_of</h3>\\n<p>该函数的作用是获取value的地址。但是该实现可能并不正确，当Tp类型重载了&amp;运算符时，下面的实现就不能取到真时的地址。</p>\\n<p>可以考虑使用<code>std::addressof</code>解决。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token comment\\">// 获取对象地址</span>\\n<span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Tp</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">constexpr</span> Tp<span class=\\"token operator\\">*</span> <span class=\\"token function\\">address_of</span><span class=\\"token punctuation\\">(</span>Tp<span class=\\"token operator\\">&amp;</span> value<span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">noexcept</span>\\n<span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token operator\\">&amp;</span>value<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};