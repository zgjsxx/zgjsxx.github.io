const n=JSON.parse('{"key":"v-dd28cada","path":"/posts/Program_language/cpp/cpp20/cpp_cpp20_concepts.html","title":"c++20 concepts","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++"],"description":"c++20 concepts concepts在c++20中被引入，其作用是对模板参数进行约束，极大地增强了c++模板的功能。 在c++20之前，如果希望获取类似的效果，使用起来并不方便。 没有concept时，如何实现对模板参数进行约束？ static_assert 我们可以使用static_assert去对模板类型T进行约束。如下所示： #include &lt;type_traits&gt; #include &lt;iostream&gt; template&lt;class T&gt; void test(T a) { static_assert(std::is_integral&lt;T&gt;()); std::cout &lt;&lt; \\"T is integral\\" &lt;&lt; std::endl; } int main() { test(10); test&lt;double&gt;(12.3); }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp20/cpp_cpp20_concepts.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++20 concepts"}],["meta",{"property":"og:description","content":"c++20 concepts concepts在c++20中被引入，其作用是对模板参数进行约束，极大地增强了c++模板的功能。 在c++20之前，如果希望获取类似的效果，使用起来并不方便。 没有concept时，如何实现对模板参数进行约束？ static_assert 我们可以使用static_assert去对模板类型T进行约束。如下所示： #include &lt;type_traits&gt; #include &lt;iostream&gt; template&lt;class T&gt; void test(T a) { static_assert(std::is_integral&lt;T&gt;()); std::cout &lt;&lt; \\"T is integral\\" &lt;&lt; std::endl; } int main() { test(10); test&lt;double&gt;(12.3); }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-27T08:12:39.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:modified_time","content":"2024-02-27T08:12:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++20 concepts\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-27T08:12:39.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"没有concept时，如何实现对模板参数进行约束？","slug":"没有concept时-如何实现对模板参数进行约束","link":"#没有concept时-如何实现对模板参数进行约束","children":[{"level":3,"title":"static_assert","slug":"static-assert","link":"#static-assert","children":[]},{"level":3,"title":"SFINAE","slug":"sfinae","link":"#sfinae","children":[]},{"level":3,"title":"enable_if","slug":"enable-if","link":"#enable-if","children":[]}]},{"level":2,"title":"有了concept之后如何使用？","slug":"有了concept之后如何使用","link":"#有了concept之后如何使用","children":[{"level":3,"title":"声明concept","slug":"声明concept","link":"#声明concept","children":[]},{"level":3,"title":"使用concept","slug":"使用concept","link":"#使用concept","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1709021559000,"updatedTime":1709021559000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":4.44,"words":1333},"filePathRelative":"posts/Program_language/cpp/cpp20/cpp_cpp20_concepts.md","localizedDate":"2024年2月27日","excerpt":"<h1> c++20 concepts</h1>\\n<p>concepts在c++20中被引入，其作用是对模板参数进行约束，极大地增强了c++模板的功能。</p>\\n<p>在c++20之前，如果希望获取类似的效果，使用起来并不方便。</p>\\n<h2> 没有concept时，如何实现对模板参数进行约束？</h2>\\n<h3> static_assert</h3>\\n<p>我们可以使用static_assert去对模板类型T进行约束。如下所示：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;type_traits&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n\\n<span class=\\"token keyword\\">template</span><span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">T</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">void</span> <span class=\\"token function\\">test</span><span class=\\"token punctuation\\">(</span>T a<span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">static_assert</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">is_integral</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>T<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token string\\">\\"T is integral\\"</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">test</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">10</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token generic-function\\"><span class=\\"token function\\">test</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">double</span><span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">12.3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> \\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
