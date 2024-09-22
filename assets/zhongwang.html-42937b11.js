import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const e={},p=t(`<ul><li><a href="#%E4%B8%AD%E6%9C%9B%E8%BD%AF%E4%BB%B6%E5%9C%A8%E7%BA%BF%E7%AC%94%E8%AF%95%E7%9C%9F%E9%A2%98">中望软件在线笔试真题</a><ul><li><a href="#%E9%A2%98%E7%9B%AE1%E6%A0%91%E4%B8%8A%E6%9C%80%E9%95%BF%E5%8D%95%E8%89%B2%E8%B7%AF%E5%BE%84">题目1：树上最长单色路径</a></li></ul></li></ul><h1 id="中望软件在线笔试真题" tabindex="-1"><a class="header-anchor" href="#中望软件在线笔试真题" aria-hidden="true">#</a> 中望软件在线笔试真题</h1><h2 id="题目1-树上最长单色路径" tabindex="-1"><a class="header-anchor" href="#题目1-树上最长单色路径" aria-hidden="true">#</a> 题目1：树上最长单色路径</h2><p>题目描述如下：</p><p>对于一棵由黑白点组成的二叉树，我们需要找到其中最长的单色简单路径，其中简单路径的定义是从树上的某点开始沿树边走不重复的点到树上的另一点结束而形成的路径，而路径的长度就是经过的点的数量(包括起点和终点)。而这里我们所说的单色路径自然就是只经过一种颜色的点的路径。你需要找到这棵树上最长的单色路径。</p><p>给定一棵二叉树的根节点(树的点数小于等于300，请做到O(n)的复杂度)，请返回最长单色路径的长度。这里的节点颜色由点上的权值表示，权值为1的是黑点，为0的是白点。</p><p>该题目基本和<strong>687. 最长同值路径</strong>相同，因此以最长相同路径进行解答。</p><p><strong>注意</strong>：687是以边的数量作为最长路径的，如果题目要求以点的数量最为最长路径，则需要进行加1。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> <span class="token function">longestUnivaluePath</span><span class="token punctuation">(</span>TreeNode<span class="token operator">*</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 空树返回0</span>
        <span class="token keyword">int</span> maxLength <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token function">dfs</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> maxLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> maxLength<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">dfs</span><span class="token punctuation">(</span>TreeNode<span class="token operator">*</span> node<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">&amp;</span> maxLength<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>node<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> leftLength <span class="token operator">=</span> <span class="token function">dfs</span><span class="token punctuation">(</span>node<span class="token operator">-&gt;</span>left<span class="token punctuation">,</span> maxLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rightLength <span class="token operator">=</span> <span class="token function">dfs</span><span class="token punctuation">(</span>node<span class="token operator">-&gt;</span>right<span class="token punctuation">,</span> maxLength<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Check paths</span>
        <span class="token keyword">int</span> leftPath <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> rightPath <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-&gt;</span>left <span class="token operator">&amp;&amp;</span> node<span class="token operator">-&gt;</span>left<span class="token operator">-&gt;</span>val <span class="token operator">==</span> node<span class="token operator">-&gt;</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            leftPath <span class="token operator">=</span> leftLength <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-&gt;</span>right <span class="token operator">&amp;&amp;</span> node<span class="token operator">-&gt;</span>right<span class="token operator">-&gt;</span>val <span class="token operator">==</span> node<span class="token operator">-&gt;</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            rightPath <span class="token operator">=</span> rightLength <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Update the maximum length found</span>
        maxLength <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">max</span><span class="token punctuation">(</span>maxLength<span class="token punctuation">,</span> leftPath <span class="token operator">+</span> rightPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// Return the longest path including this node</span>
        <span class="token keyword">return</span> std<span class="token double-colon punctuation">::</span><span class="token function">max</span><span class="token punctuation">(</span>leftPath<span class="token punctuation">,</span> rightPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),o=[p];function l(c,i){return s(),a("div",null,o)}const u=n(e,[["render",l],["__file","zhongwang.html.vue"]]);export{u as default};
