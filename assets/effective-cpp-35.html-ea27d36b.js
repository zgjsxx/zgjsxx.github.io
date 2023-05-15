import{_ as n,V as s,W as a,a0 as e}from"./framework-9a29aaa0.js";const t={},p=e(`<h1 id="effective-c-35-考虑virtual函数以外的其他选择" tabindex="-1"><a class="header-anchor" href="#effective-c-35-考虑virtual函数以外的其他选择" aria-hidden="true">#</a> effective c++ 35 考虑virtual函数以外的其他选择</h1><p>在本节中，作者给出了一些可以替代调用virtual函数的方法。下面就一一进行介绍。</p><h2 id="分析" tabindex="-1"><a class="header-anchor" href="#分析" aria-hidden="true">#</a> 分析</h2><p>1.考虑NVI的实现方式(模板方法设计模式)</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">GameCharacter</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token comment">// derived classes do not redefine this</span>
	<span class="token keyword">int</span> <span class="token function">healthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">int</span> retVal <span class="token operator">=</span> <span class="token function">doHealthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">return</span> retVal<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token comment">// derived classes may redefine this</span>
	<span class="token comment">// default algorithm for calc health</span>
	<span class="token keyword">virtual</span> <span class="token keyword">int</span> <span class="token function">doHealthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">MyCoolCharacter</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">GameCharacter</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
	<span class="token keyword">int</span> <span class="token function">doHealthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">17</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.考虑函数指针（策略模式）</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// The Strategy Pattern via Function Pointers.</span>

<span class="token comment">// Forward declaration</span>
<span class="token keyword">class</span> <span class="token class-name">GameCharacter</span><span class="token punctuation">;</span>

<span class="token comment">// Function for the default health calculation algorithm.</span>
<span class="token keyword">int</span> <span class="token function">defaultHealthCalc</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span> gc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">GameCharacter</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">typedef</span> <span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>HealthCalcFunc<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">explicit</span> <span class="token function">GameCharacter</span><span class="token punctuation">(</span>HealthCalcFunc hcf <span class="token operator">=</span> defaultHealthCalc<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">healthFunc</span><span class="token punctuation">(</span>hcf<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">int</span> <span class="token function">healthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">healthFunc</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	HealthCalcFunc healthFunc<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">EvilBadGuy</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">GameCharacter</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">EvilBadGuy</span><span class="token punctuation">(</span>HealthCalcFunc hcf <span class="token operator">=</span> defaultHealthCalc<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">GameCharacter</span><span class="token punctuation">(</span>hcf<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.考虑使用<code>std::function</code>（策略模式）</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// The Strategy Pattern via tr1::function.</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;functional&gt;</span></span>


<span class="token comment">// Forward declaration</span>
<span class="token keyword">class</span> <span class="token class-name">GameCharacter</span><span class="token punctuation">;</span>

<span class="token comment">// Function for the default health calculation algorithm.</span>
<span class="token keyword">int</span> <span class="token function">defaultHealthCalc</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span> gc<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">class</span> <span class="token class-name">GameCharacter</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token comment">// HealthCalcFunc is any callable entity that can be called with</span>
	<span class="token comment">// anything compatible with a GameCharacter and that returns</span>
	<span class="token comment">// anything compatible with an int; see below for details.</span>
	<span class="token keyword">typedef</span> std<span class="token double-colon punctuation">::</span>tr1<span class="token double-colon punctuation">::</span>function<span class="token operator">&lt;</span><span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span><span class="token punctuation">)</span><span class="token operator">&gt;</span> HealthCalcFunc<span class="token punctuation">;</span>

	<span class="token keyword">explicit</span> <span class="token function">GameCharacter</span><span class="token punctuation">(</span>HealthCalcFunc hcf <span class="token operator">=</span> defaultHealthCalc<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">healthFunc</span><span class="token punctuation">(</span>hcf<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">int</span> <span class="token function">healthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">healthFunc</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	HealthCalcFunc healthFunc<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">EvilBadGuy</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">GameCharacter</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">EvilBadGuy</span><span class="token punctuation">(</span>HealthCalcFunc hcf <span class="token operator">=</span> defaultHealthCalc<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">GameCharacter</span><span class="token punctuation">(</span>hcf<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">EyeCandyGuy</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">GameCharacter</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">EyeCandyGuy</span><span class="token punctuation">(</span>HealthCalcFunc hcf <span class="token operator">=</span> defaultHealthCalc<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">GameCharacter</span><span class="token punctuation">(</span>hcf<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token comment">// New flexibility:</span>

<span class="token comment">// Health calculation function.</span>
<span class="token comment">// Note: non-int return type.</span>
<span class="token keyword">short</span> <span class="token function">calcHealth</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token number">256</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Class for health calculation object.</span>
<span class="token keyword">struct</span> <span class="token class-name">HealthCalculator</span>
<span class="token punctuation">{</span>
	<span class="token comment">// Calculation function object.</span>
	<span class="token keyword">int</span> <span class="token keyword">operator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">7</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">GameLevel</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token comment">// Health calculation member function.</span>
	<span class="token comment">// Note: non-int return type.</span>
	<span class="token keyword">float</span> <span class="token function">health</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">7.5f</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.经典的策略模式</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// The &quot;Classic&quot; Strategy Pattern.</span>

<span class="token comment">// Forward declaration</span>
<span class="token keyword">class</span> <span class="token class-name">GameCharacter</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">HealthCalcFunc</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">virtual</span> <span class="token keyword">int</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span> gc<span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">17</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MyHealthCalcFunc</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">HealthCalcFunc</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">int</span> <span class="token function">calc</span><span class="token punctuation">(</span><span class="token keyword">const</span> GameCharacter<span class="token operator">&amp;</span> gc<span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">25</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


HealthCalcFunc defaultHealthCalcFunc<span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">GameCharacter</span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">GameCharacter</span><span class="token punctuation">(</span>HealthCalcFunc<span class="token operator">*</span> phcf <span class="token operator">=</span> <span class="token operator">&amp;</span>defaultHealthCalcFunc<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">pHealthCalcFunc</span><span class="token punctuation">(</span>phcf<span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">int</span> <span class="token function">healthValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">return</span> pHealthCalcFunc<span class="token operator">-&gt;</span><span class="token function">calc</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
	HealthCalcFunc<span class="token operator">*</span> pHealthCalcFunc<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">class</span> <span class="token class-name">EvilBadGuy</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">GameCharacter</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
	<span class="token keyword">explicit</span> <span class="token function">EvilBadGuy</span><span class="token punctuation">(</span>HealthCalcFunc<span class="token operator">*</span> phcf <span class="token operator">=</span> <span class="token operator">&amp;</span>defaultHealthCalcFunc<span class="token punctuation">)</span> <span class="token operator">:</span>
		<span class="token function">GameCharacter</span><span class="token punctuation">(</span>phcf<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
		<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>使用non-virtual interface(NVI)手法， 那么是Template Method设计模式的一种特殊形式。它以public non-virtual成员函数包裹较低访问性的virtual函数。</li><li>将virtual函数替换为&quot;函数指针成员变量&quot;， 这是Strategy设计模式的一种分解表现形式。</li><li>使用std::function成员变量替换virtual函数，因而允许任何可调用对象搭配一个兼容于需求的签名式。这也是Strategy设计模式的某种形式。</li><li>将继承体系内的virtual函数替换为另一个继承体系内的virtual函数。这是Strategy设计模式的传统实现手法。</li></ul>`,13),c=[p];function l(i,o){return s(),a("div",null,c)}const r=n(t,[["render",l],["__file","effective-cpp-35.html.vue"]]);export{r as default};
