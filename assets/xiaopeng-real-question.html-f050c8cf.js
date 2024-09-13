import{_ as t,V as e,W as p,a0 as a,X as n,Y as s}from"./framework-9a29aaa0.js";const c={},o=a('<hr><p>category:</p><ul><li>面试 tag:</li><li>面试</li></ul><hr><ul><li><a href="#%E5%B0%8F%E9%B9%8F%E6%B1%BD%E8%BD%A6%E5%9C%A8%E7%BA%BF%E7%AC%94%E8%AF%95%E7%9C%9F%E9%A2%98">小鹏汽车在线笔试真题</a><ul><li><a href="#%E9%A2%98%E7%9B%AE%E5%AD%97%E7%AC%A6%E4%B8%B2%E9%9D%9E%E7%A9%BA%E5%AD%90%E5%BA%8F%E5%88%97">题目：字符串非空子序列</a></li><li><a href="#%E9%97%AE%E9%A2%981%E8%AE%A1%E7%AE%97%E5%AD%97%E7%AC%A6%E4%B8%B2%E9%9D%9E%E7%A9%BA%E5%AD%90%E5%BA%8F%E5%88%97%E7%9A%84%E4%B8%AA%E6%95%B0%E5%81%87%E5%AE%9A%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%97%A0%E9%87%8D%E5%A4%8D%E5%AD%97%E7%AC%A6">问题1：计算字符串非空子序列的个数(假定字符串无重复字符)</a></li><li><a href="#%E9%97%AE%E9%A2%982%E5%A6%82%E6%9E%9C%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%B2%A1%E6%9C%89%E9%87%8D%E5%A4%8D%E5%AD%97%E7%AC%A6%E6%89%93%E5%8D%B0%E5%87%BA%E6%89%80%E6%9C%89%E7%9A%84%E9%9D%9E%E7%A9%BA%E5%AD%90%E4%B8%B2">问题2：如果字符串没有重复字符，打印出所有的非空子串</a></li><li><a href="#%E9%97%AE%E9%A2%983%E5%A6%82%E6%9E%9C%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%9C%89%E9%87%8D%E5%A4%8D%E5%AD%97%E7%AC%A6%E6%89%93%E5%8D%B0%E5%87%BA%E6%89%80%E6%9C%89%E7%9A%84%E9%9D%9E%E7%A9%BA%E5%AD%90%E5%BA%8F%E5%88%97">问题3:如果字符串有重复字符，打印出所有的非空子序列</a></li></ul></li></ul><h1 id="小鹏汽车在线笔试真题" tabindex="-1"><a class="header-anchor" href="#小鹏汽车在线笔试真题" aria-hidden="true">#</a> 小鹏汽车在线笔试真题</h1><h2 id="题目-字符串非空子序列" tabindex="-1"><a class="header-anchor" href="#题目-字符串非空子序列" aria-hidden="true">#</a> 题目：字符串非空子序列</h2><p>字符串的子序列是指可以通过删除字符串中的某些字符（也可以不删除）得到的新字符串，但不改变字符的相对顺序。请解决下面的问题：</p><ul><li>1.计算字符串非空子序列的个数(假定字符串无重复字符)</li><li>2.如果字符串没有重复字符，打印出所有的非空子序列</li><li>3.如果字符串有重复字符，打印出所有的非空子序列</li></ul><h2 id="问题1-计算字符串非空子序列的个数-假定字符串无重复字符" tabindex="-1"><a class="header-anchor" href="#问题1-计算字符串非空子序列的个数-假定字符串无重复字符" aria-hidden="true">#</a> 问题1：计算字符串非空子序列的个数(假定字符串无重复字符)</h2><p>方法1：</p><p>其实如果问题2解决，那么问题1也就自然而然的解决了，因此方法1就是直接构建出所有的子序列，然后求size。</p><p>方法2：</p>',13),l=n("p",null,[s("字符串的每一个位置的状态是保留或者删除，因此总的子序列个数是"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msup",null,[n("mn",null,"2"),n("mi",null,"n")])]),n("annotation",{encoding:"application/x-tex"},"{2}^{n}")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.6644em"}}),n("span",{class:"mord"},[n("span",{class:"mord"},[n("span",{class:"mord"},"2")]),n("span",{class:"msupsub"},[n("span",{class:"vlist-t"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.6644em"}},[n("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},[n("span",{class:"mord mathnormal mtight"},"n")])])])])])])])])])])]),s(", 排除空序列，则数量为"),n("span",{class:"katex"},[n("span",{class:"katex-mathml"},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("semantics",null,[n("mrow",null,[n("msup",null,[n("mn",null,"2"),n("mi",null,"n")]),n("mo",null,"−"),n("mn",null,"1")]),n("annotation",{encoding:"application/x-tex"},"{2}^{n} - 1")])])]),n("span",{class:"katex-html","aria-hidden":"true"},[n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.7477em","vertical-align":"-0.0833em"}}),n("span",{class:"mord"},[n("span",{class:"mord"},[n("span",{class:"mord"},"2")]),n("span",{class:"msupsub"},[n("span",{class:"vlist-t"},[n("span",{class:"vlist-r"},[n("span",{class:"vlist",style:{height:"0.6644em"}},[n("span",{style:{top:"-3.063em","margin-right":"0.05em"}},[n("span",{class:"pstrut",style:{height:"2.7em"}}),n("span",{class:"sizing reset-size6 size3 mtight"},[n("span",{class:"mord mtight"},[n("span",{class:"mord mathnormal mtight"},"n")])])])])])])])]),n("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),n("span",{class:"mbin"},"−"),n("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),n("span",{class:"base"},[n("span",{class:"strut",style:{height:"0.6444em"}}),n("span",{class:"mord"},"1")])])]),s("。")],-1),i=a(`<h2 id="问题2-如果字符串没有重复字符-打印出所有的非空子串" tabindex="-1"><a class="header-anchor" href="#问题2-如果字符串没有重复字符-打印出所有的非空子串" aria-hidden="true">#</a> 问题2：如果字符串没有重复字符，打印出所有的非空子串</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;vector&gt;</span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token comment">// 递归函数生成所有非空子序列</span>
<span class="token keyword">void</span> <span class="token function">generateSubsequences</span><span class="token punctuation">(</span><span class="token keyword">const</span> string<span class="token operator">&amp;</span> str<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> string current<span class="token punctuation">,</span> vector<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span><span class="token operator">&amp;</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果到达字符串的末尾</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果当前字符串不为空，则将其加入结果中</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>current<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 不选择当前字符</span>
    <span class="token function">generateSubsequences</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> current<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 选择当前字符</span>
    current<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>str<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">generateSubsequences</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> current<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    string input<span class="token operator">=</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>

    vector<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span> subsequences<span class="token punctuation">;</span>
    <span class="token function">generateSubsequences</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> subsequences<span class="token punctuation">)</span><span class="token punctuation">;</span>

    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;非空子序列为:&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">auto</span><span class="token operator">&amp;</span> subsequence <span class="token operator">:</span> subsequences<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> subsequence <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题3-如果字符串有重复字符-打印出所有的非空子序列" tabindex="-1"><a class="header-anchor" href="#问题3-如果字符串有重复字符-打印出所有的非空子序列" aria-hidden="true">#</a> 问题3:如果字符串有重复字符，打印出所有的非空子序列</h2><p><strong>方法1</strong>：使用集合set</p><p>如果原始字符串中包含重复字符，并且你希望生成的子序列不包含重复的子序列（即结果中的子序列应该是唯一的），可以通过使用 集合 (set) 来去重。</p><p>我们可以对生成的子序列进行去重处理。具体做法是在递归过程中，把每一个生成的子序列存储到一个集合中，因为集合中的元素是唯一的，重复的子序列将自动被忽略。</p><p>下面是修改后的代码，使用 set 来存储唯一的子序列：</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;set&gt;</span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token comment">// 递归函数生成所有非空子序列</span>
<span class="token keyword">void</span> <span class="token function">generateSubsequences</span><span class="token punctuation">(</span><span class="token keyword">const</span> string<span class="token operator">&amp;</span> str<span class="token punctuation">,</span> <span class="token keyword">int</span> index<span class="token punctuation">,</span> string current<span class="token punctuation">,</span> set<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span><span class="token operator">&amp;</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果到达字符串的末尾</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">==</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果当前字符串不为空，则将其加入结果中</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>current<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span>current<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 不选择当前字符</span>
    <span class="token function">generateSubsequences</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> current<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 选择当前字符</span>
    current<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>str<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">generateSubsequences</span><span class="token punctuation">(</span>str<span class="token punctuation">,</span> index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> current<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    string input<span class="token operator">=</span><span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>

    set<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span> subsequences<span class="token punctuation">;</span>
    <span class="token function">generateSubsequences</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> subsequences<span class="token punctuation">)</span><span class="token punctuation">;</span>

    cout <span class="token operator">&lt;&lt;</span> <span class="token string">&quot;非空子序列为:&quot;</span> <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">auto</span><span class="token operator">&amp;</span> subsequence <span class="token operator">:</span> subsequences<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cout <span class="token operator">&lt;&lt;</span> subsequence <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改点：</p><p>使用了 <code>set&lt;string&gt;</code> 来存储子序列，这样可以确保每个子序列只会被存储一次，去除了重复的子序列。</p>`,10),u=[o,l,i];function r(k,d){return e(),p("div",null,u)}const v=t(c,[["render",r],["__file","xiaopeng-real-question.html.vue"]]);export{v as default};