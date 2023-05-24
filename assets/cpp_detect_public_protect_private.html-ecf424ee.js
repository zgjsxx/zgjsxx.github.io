const s=JSON.parse('{"key":"v-9f0e5862","path":"/posts/Program_language/cpp/cpp_detect_public_protect_private.html","title":"","lang":"zh-CN","frontmatter":{"description":"#include &lt;iostream&gt; #include &lt;type_traits&gt; class PrivateX { int x; }; class ProtectedX { protected: int x; }; class PublicX { public: int x; }; class NoX {}; template &lt;typename T&gt; class IsPublicMember { template &lt;typename U = T&gt; static std::true_type Test(decltype(std::declval&lt;U&gt;().x)*); template &lt;typename U = T&gt; static std::false_type Test(...); public: constexpr static bool value = decltype(Test(0))::value; }; template &lt;typename T&gt; class IsProtectedMember { struct Derived : T { template &lt;typename U = Derived&gt; static std::true_type Test(decltype(std::declval&lt;U&gt;().x)*); template &lt;typename U = Derived&gt; static std::false_type Test(...); }; public: constexpr static bool value = decltype(Derived::Test(0))::value; }; template &lt;typename T&gt; class IsPrivateMember { struct Fallback { int x; }; struct Derived : T, Fallback { template &lt;typename U = Derived&gt; static std::false_type Test(decltype(std::declval&lt;U&gt;().x)*); template &lt;typename U = Derived&gt; static std::true_type Test(...); constexpr static bool value = decltype(Test(0))::value; }; public: constexpr static bool value = decltype(Derived::Test(0))::value; }; template &lt;typename T&gt; constexpr const char* DetectMember() { if constexpr (IsPublicMember&lt;T&gt;::value) { return \\"public\\"; } else if constexpr (IsProtectedMember&lt;T&gt;::value) { return \\"protected\\"; } else if constexpr (IsPrivateMember&lt;T&gt;::value) { return \\"private\\"; } else { return \\"member does not exist\\"; } } int main() { std::cout &lt;&lt; DetectMember&lt;PublicX&gt;() &lt;&lt; std::endl; std::cout &lt;&lt; DetectMember&lt;ProtectedX&gt;() &lt;&lt; std::endl; std::cout &lt;&lt; DetectMember&lt;PrivateX&gt;() &lt;&lt; std::endl; std::cout &lt;&lt; DetectMember&lt;NoX&gt;() &lt;&lt; std::endl; return 0; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/Program_language/cpp/cpp_detect_public_protect_private.html"}],["meta",{"property":"og:site_name","content":"Code Building"}],["meta",{"property":"og:description","content":"#include &lt;iostream&gt; #include &lt;type_traits&gt; class PrivateX { int x; }; class ProtectedX { protected: int x; }; class PublicX { public: int x; }; class NoX {}; template &lt;typename T&gt; class IsPublicMember { template &lt;typename U = T&gt; static std::true_type Test(decltype(std::declval&lt;U&gt;().x)*); template &lt;typename U = T&gt; static std::false_type Test(...); public: constexpr static bool value = decltype(Test(0))::value; }; template &lt;typename T&gt; class IsProtectedMember { struct Derived : T { template &lt;typename U = Derived&gt; static std::true_type Test(decltype(std::declval&lt;U&gt;().x)*); template &lt;typename U = Derived&gt; static std::false_type Test(...); }; public: constexpr static bool value = decltype(Derived::Test(0))::value; }; template &lt;typename T&gt; class IsPrivateMember { struct Fallback { int x; }; struct Derived : T, Fallback { template &lt;typename U = Derived&gt; static std::false_type Test(decltype(std::declval&lt;U&gt;().x)*); template &lt;typename U = Derived&gt; static std::true_type Test(...); constexpr static bool value = decltype(Test(0))::value; }; public: constexpr static bool value = decltype(Derived::Test(0))::value; }; template &lt;typename T&gt; constexpr const char* DetectMember() { if constexpr (IsPublicMember&lt;T&gt;::value) { return \\"public\\"; } else if constexpr (IsProtectedMember&lt;T&gt;::value) { return \\"protected\\"; } else if constexpr (IsPrivateMember&lt;T&gt;::value) { return \\"private\\"; } else { return \\"member does not exist\\"; } } int main() { std::cout &lt;&lt; DetectMember&lt;PublicX&gt;() &lt;&lt; std::endl; std::cout &lt;&lt; DetectMember&lt;ProtectedX&gt;() &lt;&lt; std::endl; std::cout &lt;&lt; DetectMember&lt;PrivateX&gt;() &lt;&lt; std::endl; std::cout &lt;&lt; DetectMember&lt;NoX&gt;() &lt;&lt; std::endl; return 0; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-05-24T06:08:01.000Z"}],["meta",{"property":"article:modified_time","content":"2023-05-24T06:08:01.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-05-24T06:08:01.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1684908481000,"updatedTime":1684908481000,"contributors":[{"name":"zgjsxx","email":"119160524@qq.com","commits":1}]},"readingTime":{"minutes":0.73,"words":220},"filePathRelative":"posts/Program_language/cpp/cpp_detect_public_protect_private.md","localizedDate":"2023年5月24日","excerpt":"<div class=\\"language-cpp line-numbers-mode\\" data-ext=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;iostream&gt;</span></span>\\n<span class=\\"token macro property\\"><span class=\\"token directive-hash\\">#</span><span class=\\"token directive keyword\\">include</span> <span class=\\"token string\\">&lt;type_traits&gt;</span></span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">PrivateX</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">int</span> x<span class=\\"token punctuation\\">;</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ProtectedX</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">protected</span><span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">int</span> x<span class=\\"token punctuation\\">;</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">PublicX</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span> <span class=\\"token keyword\\">int</span> x<span class=\\"token punctuation\\">;</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">NoX</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">T</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">IsPublicMember</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">U</span> <span class=\\"token operator\\">=</span> T<span class=\\"token operator\\">&gt;</span>\\n  <span class=\\"token keyword\\">static</span> std<span class=\\"token double-colon punctuation\\">::</span>true_type <span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">decltype</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">declval</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>U<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span>x<span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">U</span> <span class=\\"token operator\\">=</span> T<span class=\\"token operator\\">&gt;</span>\\n  <span class=\\"token keyword\\">static</span> std<span class=\\"token double-colon punctuation\\">::</span>false_type <span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n  <span class=\\"token keyword\\">constexpr</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">bool</span> value <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">decltype</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token double-colon punctuation\\">::</span>value<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">T</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">IsProtectedMember</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">Derived</span> <span class=\\"token operator\\">:</span> <span class=\\"token base-clause\\"><span class=\\"token class-name\\">T</span></span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">U</span> <span class=\\"token operator\\">=</span> Derived<span class=\\"token operator\\">&gt;</span>\\n    <span class=\\"token keyword\\">static</span> std<span class=\\"token double-colon punctuation\\">::</span>true_type <span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">decltype</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">declval</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>U<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span>x<span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">U</span> <span class=\\"token operator\\">=</span> Derived<span class=\\"token operator\\">&gt;</span>\\n    <span class=\\"token keyword\\">static</span> std<span class=\\"token double-colon punctuation\\">::</span>false_type <span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n  <span class=\\"token keyword\\">constexpr</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">bool</span> value <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">decltype</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Derived</span><span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token double-colon punctuation\\">::</span>value<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">T</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">IsPrivateMember</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">Fallback</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">int</span> x<span class=\\"token punctuation\\">;</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token keyword\\">struct</span> <span class=\\"token class-name\\">Derived</span> <span class=\\"token operator\\">:</span> <span class=\\"token base-clause\\"><span class=\\"token class-name\\">T</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">Fallback</span></span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">U</span> <span class=\\"token operator\\">=</span> Derived<span class=\\"token operator\\">&gt;</span>\\n    <span class=\\"token keyword\\">static</span> std<span class=\\"token double-colon punctuation\\">::</span>false_type <span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">decltype</span><span class=\\"token punctuation\\">(</span>std<span class=\\"token double-colon punctuation\\">::</span><span class=\\"token generic-function\\"><span class=\\"token function\\">declval</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>U<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span>x<span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">*</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">U</span> <span class=\\"token operator\\">=</span> Derived<span class=\\"token operator\\">&gt;</span>\\n    <span class=\\"token keyword\\">static</span> std<span class=\\"token double-colon punctuation\\">::</span>true_type <span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">.</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">constexpr</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">bool</span> value <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">decltype</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token double-colon punctuation\\">::</span>value<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n  <span class=\\"token keyword\\">constexpr</span> <span class=\\"token keyword\\">static</span> <span class=\\"token keyword\\">bool</span> value <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">decltype</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Derived</span><span class=\\"token double-colon punctuation\\">::</span><span class=\\"token function\\">Test</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token double-colon punctuation\\">::</span>value<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">template</span> <span class=\\"token operator\\">&lt;</span><span class=\\"token keyword\\">typename</span> <span class=\\"token class-name\\">T</span><span class=\\"token operator\\">&gt;</span>\\n<span class=\\"token keyword\\">constexpr</span> <span class=\\"token keyword\\">const</span> <span class=\\"token keyword\\">char</span><span class=\\"token operator\\">*</span> <span class=\\"token function\\">DetectMember</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token keyword\\">constexpr</span> <span class=\\"token punctuation\\">(</span>IsPublicMember<span class=\\"token operator\\">&lt;</span>T<span class=\\"token operator\\">&gt;</span><span class=\\"token double-colon punctuation\\">::</span>value<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\\"public\\"</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span> <span class=\\"token keyword\\">constexpr</span> <span class=\\"token punctuation\\">(</span>IsProtectedMember<span class=\\"token operator\\">&lt;</span>T<span class=\\"token operator\\">&gt;</span><span class=\\"token double-colon punctuation\\">::</span>value<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\\"protected\\"</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span> <span class=\\"token keyword\\">constexpr</span> <span class=\\"token punctuation\\">(</span>IsPrivateMember<span class=\\"token operator\\">&lt;</span>T<span class=\\"token operator\\">&gt;</span><span class=\\"token double-colon punctuation\\">::</span>value<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\\"private\\"</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\\"member does not exist\\"</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">int</span> <span class=\\"token function\\">main</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token generic-function\\"><span class=\\"token function\\">DetectMember</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>PublicX<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n  std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token generic-function\\"><span class=\\"token function\\">DetectMember</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>ProtectedX<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n  std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token generic-function\\"><span class=\\"token function\\">DetectMember</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>PrivateX<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n  std<span class=\\"token double-colon punctuation\\">::</span>cout <span class=\\"token operator\\">&lt;&lt;</span> <span class=\\"token generic-function\\"><span class=\\"token function\\">DetectMember</span><span class=\\"token generic class-name\\"><span class=\\"token operator\\">&lt;</span>NoX<span class=\\"token operator\\">&gt;</span></span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">&lt;&lt;</span> std<span class=\\"token double-colon punctuation\\">::</span>endl<span class=\\"token punctuation\\">;</span>\\n\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{s as data};
