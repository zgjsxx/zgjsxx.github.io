import{_ as s,V as n,W as a,a0 as e}from"./framework-9a29aaa0.js";const p={},l=e(`<p>监控某个进程的内存</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">function</span> <span class="token function-name function">getPhyMem</span>
<span class="token punctuation">{</span>
    <span class="token assign-left variable">MEMUsage</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-o</span> rss <span class="token parameter variable">-p</span> $1<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> RSS<span class="token variable">)</span></span>
    <span class="token assign-left variable">MEM</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">expr</span> $MEMUsage + <span class="token number">0</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token number">1024</span>
    <span class="token builtin class-name">local</span> <span class="token assign-left variable">MEMUsageMB</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">awk</span> <span class="token string">&#39;BEGIN{printf &quot;%.2f\\n&quot;,&#39;</span>$MEM<span class="token string">&#39;/&#39;</span>$num<span class="token string">&#39;}&#39;</span><span class="token variable">)</span></span>

    <span class="token keyword">if</span> <span class="token variable"><span class="token punctuation">((</span> $<span class="token punctuation">(</span>echo &quot;$MEMUsageMB <span class="token operator">&gt;</span> $MemPhyMem&quot;<span class="token operator">|</span>bc <span class="token operator">-</span>l<span class="token punctuation">)</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token assign-left variable">MemPhyMem</span><span class="token operator">=</span><span class="token variable">$MEMUsageMB</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;process <span class="token variable">$1</span> current phy mem is &quot;</span> <span class="token variable">$MEMUsageMB</span> <span class="token string">&quot; MB&quot;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function-name function">getVirtMem</span>
<span class="token punctuation">{</span>

    <span class="token assign-left variable">MEMUsage</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-o</span> vsz <span class="token parameter variable">-p</span> $1<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> VSZ<span class="token variable">)</span></span>
    <span class="token assign-left variable">MEM</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">expr</span> $MEMUsage + <span class="token number">0</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">num</span><span class="token operator">=</span><span class="token number">1024</span>
    <span class="token builtin class-name">local</span> <span class="token assign-left variable">MEMUsageMB</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">awk</span> <span class="token string">&#39;BEGIN{printf &quot;%.2f\\n&quot;,&#39;</span>$MEM<span class="token string">&#39;/&#39;</span>$num<span class="token string">&#39;}&#39;</span><span class="token variable">)</span></span>
    <span class="token keyword">if</span> <span class="token variable"><span class="token punctuation">((</span> $<span class="token punctuation">(</span>echo &quot;$MEMUsageMB <span class="token operator">&gt;</span> $MemVirtMem&quot;<span class="token operator">|</span>bc <span class="token operator">-</span>l<span class="token punctuation">)</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span><span class="token keyword">then</span>
        <span class="token assign-left variable">MemVirtMem</span><span class="token operator">=</span><span class="token variable">$MEMUsageMB</span>
    <span class="token keyword">fi</span>

    <span class="token builtin class-name">echo</span> <span class="token string">&quot;process <span class="token variable">$1</span> current virt mem is &quot;</span> <span class="token variable">$MEMUsageMB</span> <span class="token string">&quot; MB&quot;</span>
<span class="token punctuation">}</span>

<span class="token assign-left variable">MemPhyMem</span><span class="token operator">=</span><span class="token number">0.0</span>
<span class="token assign-left variable">MemVirtMem</span><span class="token operator">=</span><span class="token number">0.0</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>true<span class="token punctuation">)</span>
<span class="token keyword">do</span>
    getPhyMem <span class="token variable">$1</span>
    getVirtMem <span class="token variable">$1</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;process <span class="token variable">$1</span> peak phy mem is &quot;</span> <span class="token variable">$MemPhyMem</span> <span class="token string">&quot; MB&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;process <span class="token variable">$1</span> peak virt mem is &quot;</span> <span class="token variable">$MemVirtMem</span> <span class="token string">&quot; MB&quot;</span>
    <span class="token function">sleep</span> 1s
<span class="token keyword">done</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),t=[l];function o(i,c){return n(),a("div",null,t)}const k=s(p,[["render",o],["__file","monitor.html.vue"]]);export{k as default};
