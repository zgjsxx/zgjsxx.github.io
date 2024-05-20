import{_ as n,V as s,W as a,a0 as t}from"./framework-9a29aaa0.js";const p={},e=t(`<hr><p>category:</p><ul><li>面试 tag:</li><li>面试</li></ul><hr><ul><li><a href="#287-%E5%AF%BB%E6%89%BE%E9%87%8D%E5%A4%8D%E6%95%B0">287. 寻找重复数</a><ul><li><a href="#%E6%96%B9%E6%B3%95%E4%B8%80-%E5%BF%AB%E6%85%A2%E6%8C%87%E9%92%88">方法一： 快慢指针</a></li></ul></li></ul><h1 id="_287-寻找重复数" tabindex="-1"><a class="header-anchor" href="#_287-寻找重复数" aria-hidden="true">#</a> 287. 寻找重复数</h1><p>给定一个包含<code>n + 1</code> 个整数的数组 nums ，其数字都在 <code>[1, n]</code> 范围内（包括 1 和 n），可知至少存在一个重复的整数。</p><p>假设 nums 只有 <strong>一个重复的整数</strong> ，返回 这个重复的数 。</p><p>你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。</p><p>示例 1：</p><p>输入：nums = [1,3,4,2,2] 输出：2 示例 2：</p><p>输入：nums = [3,1,3,4,2] 输出：3 示例 3 :</p><p>输入：nums = [3,3,3,3,3] 输出：3</p><p>提示：</p><ul><li><code>1 &lt;= n &lt;= 105</code></li><li><code>nums.length == n + 1</code></li><li><code>1 &lt;= nums[i] &lt;= n</code></li><li><code>nums</code> 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次</li></ul><h2 id="方法一-快慢指针" tabindex="-1"><a class="header-anchor" href="#方法一-快慢指针" aria-hidden="true">#</a> 方法一： 快慢指针</h2><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>class Solution <span class="token punctuation">{</span>
public<span class="token operator">:</span>
    <span class="token keyword">int</span> <span class="token function">findDuplicate</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span><span class="token operator">&amp;</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> slow <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> fast <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            slow <span class="token operator">=</span> nums<span class="token punctuation">[</span>slow<span class="token punctuation">]</span><span class="token punctuation">;</span>
            fast <span class="token operator">=</span> nums<span class="token punctuation">[</span>nums<span class="token punctuation">[</span>fast<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>slow <span class="token operator">!=</span> fast<span class="token punctuation">)</span><span class="token punctuation">;</span>
        slow <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>slow <span class="token operator">!=</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            slow <span class="token operator">=</span> nums<span class="token punctuation">[</span>slow<span class="token punctuation">]</span><span class="token punctuation">;</span>
            fast <span class="token operator">=</span> nums<span class="token punctuation">[</span>fast<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","287.html.vue"]]);export{r as default};
