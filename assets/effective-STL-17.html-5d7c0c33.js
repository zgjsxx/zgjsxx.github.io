const n=JSON.parse('{"key":"v-6d53be98","path":"/posts/Program_language/cpp/effective-STL-17.html","title":"effective STL-17 使用交换技巧来修整过剩容量","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++","effective STL读书笔记"],"description":"effective STL-17 使用交换技巧来修整过剩容量 这个是一个STL的使用技巧。当一个容器需要收缩尺寸的时候，可以使用本文中的方法。 这在对内存有较高要求的场景下，非常有效。 #include &lt;iostream&gt; #include &lt;vector&gt; int main() { \\tstd::vector&lt;int&gt; vec; \\tvec.reserve(1000);//这时强制把vec设置为容量是1000 \\tstd::cout &lt;&lt; vec.capacity() &lt;&lt; std::endl; \\tfor(int i = 0; i &lt; 10; ++i)//经过循环vec只真正用了10个int内存，还剩990int内存 \\t{ \\t\\tvec.push_back(i); \\t} \\tstd::vector&lt;int&gt;(vec).swap(vec);//修剪vec的容量，使其释放多余的内存容量，尽可能保持最小容量 \\tstd::cout &lt;&lt; vec.capacity() &lt;&lt; std::endl; std::vector&lt;int&gt;().swap(vec);//如果将容器的空间减少到0 \\tstd::cout &lt;&lt; vec.capacity() &lt;&lt; std::endl; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/effective-STL-17.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"effective STL-17 使用交换技巧来修整过剩容量"}],["meta",{"property":"og:description","content":"effective STL-17 使用交换技巧来修整过剩容量 这个是一个STL的使用技巧。当一个容器需要收缩尺寸的时候，可以使用本文中的方法。 这在对内存有较高要求的场景下，非常有效。 #include &lt;iostream&gt; #include &lt;vector&gt; int main() { \\tstd::vector&lt;int&gt; vec; \\tvec.reserve(1000);//这时强制把vec设置为容量是1000 \\tstd::cout &lt;&lt; vec.capacity() &lt;&lt; std::endl; \\tfor(int i = 0; i &lt; 10; ++i)//经过循环vec只真正用了10个int内存，还剩990int内存 \\t{ \\t\\tvec.push_back(i); \\t} \\tstd::vector&lt;int&gt;(vec).swap(vec);//修剪vec的容量，使其释放多余的内存容量，尽可能保持最小容量 \\tstd::cout &lt;&lt; vec.capacity() &lt;&lt; std::endl; std::vector&lt;int&gt;().swap(vec);//如果将容器的空间减少到0 \\tstd::cout &lt;&lt; vec.capacity() &lt;&lt; std::endl; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-09T09:04:15.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"effective STL读书笔记"}],["meta",{"property":"article:modified_time","content":"2023-05-09T09:04:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"effective STL-17 使用交换技巧来修整过剩容量\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-09T09:04:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1683623055000,"updatedTime":1683623055000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.93,"words":280},"filePathRelative":"posts/Program_language/cpp/effective-STL-17.md","localizedDate":"2023年5月9日","excerpt":"<h1> effective STL-17 使用交换技巧来修整过剩容量</h1>\\n<p>这个是一个STL的使用技巧。当一个容器需要收缩尺寸的时候，可以使用本文中的方法。</p>\\n<p>这在对内存有较高要求的场景下，非常有效。</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;vector&gt;</span></span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n\\tstd<span class=\\"token double-colon punctuation\\">::</span>vector<span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span> vec<span class=\\"token punctuation\\">;</span>\\n\\tvec<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">reserve</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//这时强制把vec设置为容量是1000</span>\\n\\tstd<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> vec<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">capacity</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n\\n\\t<span class=\\"token keyword\\">for</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span> <span class=\\"token operator\\">++</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token comment\\">//经过循环vec只真正用了10个int内存，还剩990int内存</span>\\n\\t<span class=\\"token punctuation\\">{</span>\\n\\t\\tvec<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">push_back</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\t<span class=\\"token punctuation\\">}</span>\\n\\n\\tstd<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">vector</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span>vec<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">swap</span><span class=\\"token punctuation\\">(</span>vec<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//修剪vec的容量，使其释放多余的内存容量，尽可能保持最小容量</span>\\n\\tstd<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> vec<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">capacity</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n\\n    std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">vector</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">int</span><span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">swap</span><span class=\\"token punctuation\\">(</span>vec<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//如果将容器的空间减少到0</span>\\n\\tstd<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> vec<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">capacity</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
