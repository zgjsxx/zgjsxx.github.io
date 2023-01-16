import{_ as e,V as a,W as s,a1 as n}from"./framework-d934f75f.js";const i={},l=n(`<h1 id="ebpf-helloworld" tabindex="-1"><a class="header-anchor" href="#ebpf-helloworld" aria-hidden="true">#</a> eBPF Helloworld</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone git@github.com:libbpf/libbpf-bootstrap.git
<span class="token builtin class-name">cd</span> libbpf-bootstrap/
<span class="token function">git</span> submodule update <span class="token parameter variable">--init</span> <span class="token parameter variable">--recursive</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> examples/c
<span class="token function">make</span> minimal
<span class="token function">sudo</span> ./minimal
<span class="token function">sudo</span> <span class="token function">cat</span> /sys/kernel/debug/tracing/trace_pipe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),c=[l];function t(d,o){return a(),s("div",null,c)}const p=e(i,[["render",t],["__file","ebpf-helloworld.html.vue"]]);export{p as default};
