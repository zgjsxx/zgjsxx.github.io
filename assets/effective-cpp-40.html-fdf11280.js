import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-40-明智而审慎地使用多重继承" tabindex="-1"><a class="header-anchor" href="#effective-c-40-明智而审慎地使用多重继承" aria-hidden="true">#</a> effective c++ 40 明智而审慎地使用多重继承</h1><p>本节讲解了多重继承的话题。多重继承是大多数程序员都比较讨厌的，因为代码中一旦有多重继承，很多程序员就会心生畏惧。本节就讨论多重继承的问题以及如何正确的利用好多重继承这个方法。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>1.当存在菱形继承时，需要使用virtual继承</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">File</span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token comment">// Virtual base class.</span>
<span class="token keyword">class</span> <span class="token class-name">InputFile</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">virtual</span> <span class="token keyword">public</span> <span class="token class-name">File</span></span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token comment">// Virtual base class.</span>
<span class="token keyword">class</span> <span class="token class-name">OutputFile</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">virtual</span> <span class="token keyword">public</span> <span class="token class-name">File</span></span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token comment">// Deadly Multiple Inheritance diamond.</span>
<span class="token keyword">class</span> <span class="token class-name">IOFile</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">InputFile</span><span class="token punctuation">,</span> <span class="token keyword">public</span> <span class="token class-name">OutputFile</span></span>
<span class="token punctuation">{</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.多重继承的使用场景</p><p>下面就是CPerson类public继承于IPerson， private继承于PersonInfo。IPerson中含有相关接口， PersonInfo包含相关实现。这种使用就有点像Java中的extend和implement。implement是继承一些方式， extend是继承一些实现。</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;Database.h&quot;</span></span>

<span class="token comment">// This class specifies the interface to be implemented.</span>
<span class="token keyword">class</span> <span class="token class-name">IPerson</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">IPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">virtual</span> std<span class="token double-colon punctuation">::</span>string <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token keyword">virtual</span> std<span class="token double-colon punctuation">::</span>string <span class="token function">birthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">PersonInfo</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">PersonInfo</span><span class="token punctuation">(</span>DatabaseID pid<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">PersonInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">virtual</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">theName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
	<span class="token keyword">virtual</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">theBirthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">virtual</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">valueDelimOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
	<span class="token keyword">virtual</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">valueDelimClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">static</span> <span class="token keyword">const</span> <span class="token keyword">int</span> Max_Formatted_Field_Value_Length <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token class-name">PersonInfo</span><span class="token double-colon punctuation">::</span><span class="token function">valueDelimOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
<span class="token punctuation">{</span>
	<span class="token comment">// Default opening delimiter.</span>
	<span class="token keyword">return</span> <span class="token string">&quot;[&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token class-name">PersonInfo</span><span class="token double-colon punctuation">::</span><span class="token function">valueDelimClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
<span class="token punctuation">{</span>
	<span class="token comment">// Default closing delimiter.</span>
	<span class="token keyword">return</span> <span class="token string">&quot;]&quot;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token class-name">PersonInfo</span><span class="token double-colon punctuation">::</span><span class="token function">theName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
<span class="token punctuation">{</span>
	<span class="token comment">// Reserve buffer for return value;</span>
	<span class="token comment">// Because this is static it&#39;s automatically initialized to all zeros</span>
	<span class="token keyword">static</span> <span class="token keyword">char</span> value<span class="token punctuation">[</span>Max_Formatted_Field_Value_Length<span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">// Write opening delimiter.</span>
	<span class="token function">strcpy_s</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> Max_Formatted_Field_Value_Length<span class="token punctuation">,</span> <span class="token function">valueDelimOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// Append to the string in value this object&#39;s</span>
	<span class="token comment">// name field (being careful to avoid buffer overrun)</span>

	<span class="token comment">// Write closing delimiter.</span>
	<span class="token function">strcat_s</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> Max_Formatted_Field_Value_Length<span class="token punctuation">,</span> <span class="token function">valueDelimClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token comment">// Note the use of multiple inheritance.</span>
<span class="token keyword">class</span> <span class="token class-name">CPerson</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IPerson</span><span class="token punctuation">,</span> <span class="token keyword">private</span> <span class="token class-name">PersonInfo</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">CPerson</span><span class="token punctuation">(</span>DatabaseID id<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">PersonInfo</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Implementation of the required IPerson member functions.</span>
	<span class="token keyword">virtual</span> std<span class="token double-colon punctuation">::</span>string <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">PersonInfo</span><span class="token double-colon punctuation">::</span><span class="token function">theName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">virtual</span> std<span class="token double-colon punctuation">::</span>string <span class="token function">birthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token class-name">PersonInfo</span><span class="token double-colon punctuation">::</span><span class="token function">theBirthDate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token comment">// Redefinitions of inherited virtual delimiter functions.</span>
	<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">valueDelimOpen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
	<span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">valueDelimClose</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>多重继承比单一继承复杂。它可能导致新的歧义性，以及对virtual继承的需要</li><li>virtual继承会增加大小、速度、初始化（及赋值）复杂度等等成本。如果virtual base classes不带任何数据，将是最具使用价值的情况。</li><li>多重继承的确有正当用途。其中一个情节设计&quot;public继承某个Interface class&quot;和&quot;private继承某个协助实现的class&quot;的两相组合。</li></ul>`,10),o=[p];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","effective-cpp-40.html.vue"]]);export{r as default};
