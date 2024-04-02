const n=JSON.parse('{"key":"v-7470fe76","path":"/posts/compile/duplicate_symbol_in_so.html","title":"动态库中包含了相同的符号，行为是怎样的？","lang":"zh-CN","frontmatter":{"category":["编译原理","Linux","ELF文件"],"description":"动态库中包含了相同的符号，行为是怎样的？ 分析 主程序依赖了两个库libA的funcA函数和libB的funcB函数。示意的代码(main.cpp)如下： #include &lt;cstdio&gt; int funcA(int, int); int funcB(int, int); int main() { printf(\\"%d,\\", funcA(2, 1)); printf(\\"%d\\\\n\\", funcB(2, 1)); return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/compile/duplicate_symbol_in_so.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"动态库中包含了相同的符号，行为是怎样的？"}],["meta",{"property":"og:description","content":"动态库中包含了相同的符号，行为是怎样的？ 分析 主程序依赖了两个库libA的funcA函数和libB的funcB函数。示意的代码(main.cpp)如下： #include &lt;cstdio&gt; int funcA(int, int); int funcB(int, int); int main() { printf(\\"%d,\\", funcA(2, 1)); printf(\\"%d\\\\n\\", funcB(2, 1)); return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-01T07:00:42.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-01T07:00:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"动态库中包含了相同的符号，行为是怎样的？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-01T07:00:42.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"解决方案","slug":"解决方案","link":"#解决方案","children":[]}],"git":{"createdTime":1711954842000,"updatedTime":1711954842000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":2.54,"words":763},"filePathRelative":"posts/compile/duplicate_symbol_in_so.md","localizedDate":"2024年4月1日","excerpt":"<h1> 动态库中包含了相同的符号，行为是怎样的？</h1>\\n<h2> 分析</h2>\\n<p>主程序依赖了两个库libA的funcA函数和libB的funcB函数。示意的代码(main.cpp)如下：</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;cstdio&gt;</span></span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">funcA</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">funcB</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">,</span> <span class=\\"token keyword\\">int</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"%d,\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">funcA</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">printf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"%d\\\\n\\"</span><span class=\\"token punctuation\\">,</span> <span class=\\"token function\\">funcB</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};