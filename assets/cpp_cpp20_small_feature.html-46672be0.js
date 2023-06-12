const t=JSON.parse('{"key":"v-28b49328","path":"/posts/Program_language/cpp/cpp_cpp20_small_feature.html","title":"c++20的新增的小的特性","lang":"zh-CN","frontmatter":{"category":["C++"],"tag":["C++"],"description":"c++20的新增的小的特性 std::format 新的c++字符串格式化工具 #include &lt;format&gt; #include &lt;iostream&gt; using namespace std; int main() { // Declare variables int num = 42; std::string name = \\"John\\"; // Use std::format to format a string with placeholders // for variables std::string formatted_str = std::format( \\"My name is {} and my favorite number is {}\\", name, num); // Print formatted string to console std::cout &lt;&lt; formatted_str &lt;&lt; std::endl; return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_cpp20_small_feature.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:title","content":"c++20的新增的小的特性"}],["meta",{"property":"og:description","content":"c++20的新增的小的特性 std::format 新的c++字符串格式化工具 #include &lt;format&gt; #include &lt;iostream&gt; using namespace std; int main() { // Declare variables int num = 42; std::string name = \\"John\\"; // Use std::format to format a string with placeholders // for variables std::string formatted_str = std::format( \\"My name is {} and my favorite number is {}\\", name, num); // Print formatted string to console std::cout &lt;&lt; formatted_str &lt;&lt; std::endl; return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-12T14:31:32.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:modified_time","content":"2023-06-12T14:31:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"c++20的新增的小的特性\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-06-12T14:31:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"std::format","slug":"std-format","link":"#std-format","children":[]},{"level":2,"title":"timezone","slug":"timezone","link":"#timezone","children":[]},{"level":2,"title":"std::source_location","slug":"std-source-location","link":"#std-source-location","children":[]},{"level":2,"title":"std::span","slug":"std-span","link":"#std-span","children":[]},{"level":2,"title":"std::endian判断大小端","slug":"std-endian判断大小端","link":"#std-endian判断大小端","children":[]},{"level":2,"title":"std::remove_cvref","slug":"std-remove-cvref","link":"#std-remove-cvref","children":[]},{"level":2,"title":"std::atomic_ref","slug":"std-atomic-ref","link":"#std-atomic-ref","children":[]},{"level":2,"title":"std::map<Key,T,Compare,Allocator>::contains","slug":"std-map-key-t-compare-allocator-contains","link":"#std-map-key-t-compare-allocator-contains","children":[]},{"level":2,"title":"std::barrier","slug":"std-barrier","link":"#std-barrier","children":[]},{"level":2,"title":"std::latch","slug":"std-latch","link":"#std-latch","children":[]},{"level":2,"title":"std::counting_semaphore","slug":"std-counting-semaphore","link":"#std-counting-semaphore","children":[]},{"level":2,"title":"string::starts_with / ends_with","slug":"string-starts-with-ends-with","link":"#string-starts-with-ends-with","children":[]},{"level":2,"title":"std::size","slug":"std-size","link":"#std-size","children":[]},{"level":2,"title":"std::is_bounded_array_v和std::is_unbounded_array","slug":"std-is-bounded-array-v和std-is-unbounded-array","link":"#std-is-bounded-array-v和std-is-unbounded-array","children":[]},{"level":2,"title":"std::erase_if","slug":"std-erase-if","link":"#std-erase-if","children":[]},{"level":2,"title":"Mathematical constants","slug":"mathematical-constants","link":"#mathematical-constants","children":[]},{"level":2,"title":"std::midpoint","slug":"std-midpoint","link":"#std-midpoint","children":[]},{"level":2,"title":"std::lerp","slug":"std-lerp","link":"#std-lerp","children":[]}],"git":{"createdTime":1686210777000,"updatedTime":1686580292000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":4}]},"readingTime":{"minutes":6.21,"words":1862},"filePathRelative":"posts/Program_language/cpp/cpp_cpp20_small_feature.md","localizedDate":"2023年6月8日","excerpt":"<h1> c++20的新增的小的特性</h1>\\n<h2> std::format</h2>\\n<p>新的c++字符串格式化工具</p>\\n<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;format&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n  \\n<span class=\\"token keyword\\">using</span> <span class=\\"token keyword\\">namespace</span> std<span class=\\"token punctuation\\">;</span>\\n  \\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// Declare variables</span>\\n    <span class=\\"token keyword\\">int</span> num <span class=\\"token operator\\">=</span> <span class=\\"token number\\">42</span><span class=\\"token punctuation\\">;</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>string name <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\\"John\\"</span><span class=\\"token punctuation\\">;</span>\\n  \\n    <span class=\\"token comment\\">// Use std::format to format a string with placeholders</span>\\n    <span class=\\"token comment\\">// for variables</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>string formatted_str <span class=\\"token operator\\">=</span> std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">format</span><span class=\\"token punctuation\\">(</span>\\n        <span class=\\"token string\\">\\"My name is {} and my favorite number is {}\\"</span><span class=\\"token punctuation\\">,</span> name<span class=\\"token punctuation\\">,</span>\\n        num<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  \\n    <span class=\\"token comment\\">// Print formatted string to console</span>\\n    std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> formatted_str <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n  \\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
