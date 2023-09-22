import{_ as e,V as p,W as t,X as s,Y as a,$ as r,a0 as o,F as l}from"./framework-9a29aaa0.js";const c={},i=o(`<h1 id="linux工具之perf命令详解" tabindex="-1"><a class="header-anchor" href="#linux工具之perf命令详解" aria-hidden="true">#</a> Linux工具之perf命令详解</h1><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> perf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="perf工具简述" tabindex="-1"><a class="header-anchor" href="#perf工具简述" aria-hidden="true">#</a> perf工具简述</h2><p>Perf 是一个包含 22 种子工具的工具集，每个工具分别作为一个子命令。</p><p>annotate 命令读取 perf.data 并显示注释过的代码;diff 命令读取两个 perf.data 文件并显示两份剖析信息之间的差异;</p><p>evlist 命令列出一个 perf.data 文件的事件名称;</p><p>inject 命令过滤以加强事件流，在其中加入额外的信 息;</p><p>kmem 命令为跟踪和测量内核中 slab 子系统属性的工具;</p><p>kvm 命令为跟踪和测量 kvm 客户机操 作系统的工具;</p><p>list 命令列出所有符号事件类型;</p><p>lock 命令分析锁事件;</p><p>probe 命令定义新的动态跟 踪点;</p><p>record 命令运行一个程序，并把剖析信息记录在 perf.data 中;</p><p>report 命令读取 perf.data 并显 示剖析信息;</p><p>sched 命令为跟踪和测量内核调度器属性的工具;</p><p>script 命令读取 perf.data 并显示跟踪 输出;</p><p>stat 命令运行一个程序并收集性能计数器统计信息;</p><p>timechart 命令为可视化某个负载在某时 间段的系统总体性能的工具;</p><p>top 命令为系统剖析工具。</p><p>CPU 性能分析 　　在 Linux 我们可以使用 perf 工具分析 CPU 的性能，它可以将消耗 CPU 时间比较大的用户程序调用栈打印出来，并生成火焰图。首先，在 Ubuntu 安装 perf 工具：</p><p>使用sudo perf list命令可以看到 perf 支持的事件，事件有三种类型：Software event、Hardware event 和 Tracepoint event。使用perf stat可以对某个操作执行期间发生的事件作统计，例如我们可以对下面的命令进行统计：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>/dev/null <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">1000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以统计这个命令执行期间的 CPU 使用率，上下文切换次数等信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ perf <span class="token function">stat</span> <span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>/dev/null <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">1000000</span>
<span class="token number">1000000</span>+0 records <span class="token keyword">in</span>
<span class="token number">1000000</span>+0 records out
<span class="token number">512000000</span> bytes <span class="token punctuation">(</span><span class="token number">512</span> MB<span class="token punctuation">)</span> copied, <span class="token number">0.332629</span> s, <span class="token number">1.5</span> GB/s
 Performance counter stats <span class="token keyword">for</span> <span class="token string">&#39;dd if=/dev/zero of=/dev/null count=1000000&#39;</span><span class="token builtin class-name">:</span>
        <span class="token number">331.923086</span> task-clock <span class="token punctuation">(</span>msec<span class="token punctuation">)</span>         <span class="token comment">#    0.994 CPUs utilized</span>
               <span class="token number">107</span> context-switches          <span class="token comment">#    0.322 K/sec</span>
                 <span class="token number">0</span> cpu-migrations            <span class="token comment">#    0.000 K/sec</span>
               <span class="token number">226</span> page-faults               <span class="token comment">#    0.681 K/sec</span>
   <span class="token operator">&lt;</span>not supported<span class="token operator">&gt;</span> cycles
   <span class="token operator">&lt;</span>not supported<span class="token operator">&gt;</span> stalled-cycles-frontend
   <span class="token operator">&lt;</span>not supported<span class="token operator">&gt;</span> stalled-cycles-backend
   <span class="token operator">&lt;</span>not supported<span class="token operator">&gt;</span> instructions
   <span class="token operator">&lt;</span>not supported<span class="token operator">&gt;</span> branches
   <span class="token operator">&lt;</span>not supported<span class="token operator">&gt;</span> branch-misses
       <span class="token number">0.334055984</span> seconds <span class="token function">time</span> elapsed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一个有用的命令是perf record，它可以对事件进行采样，将采样的数据收集在一个 perf.data 的文件中，这将会带来一定的性能开销，不过这个命令很有用，可以用来找出最占 CPU 的进程。下面的命令对系统 CPU 事件做采样，采样时间为 60 秒，每秒采样 99 个事件，-g表示记录程序的调用栈。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>perf record <span class="token parameter variable">-F</span> <span class="token number">99</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-g</span> -- <span class="token function">sleep</span> <span class="token number">60</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行这个命令将生成一个 perf.data 文件：</p><p>执行sudo perf report -n可以生成报告的预览。 执行sudo perf report -n --stdio可以生成一个详细的报告。 执行sudo perf script可以 dump 出 perf.data 的内容。 也可以记录某个进程的事件，例如记录进程号为 1641 的进程：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">sudo</span> perf record <span class="token parameter variable">-F</span> <span class="token number">99</span> <span class="token parameter variable">-p</span> <span class="token number">1641</span> <span class="token parameter variable">-g</span> -- <span class="token function">sleep</span> <span class="token number">60</span>
$ <span class="token function">sudo</span> perf script <span class="token operator">&gt;</span> out.perf   <span class="token comment"># 将 perf.data 的内容 dump 到 out.perf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>生成火焰图</p><p>通常的做法是将 out.perf 拷贝到本地机器，在本地生成火焰图：</p>`,32),d={href:"https://github.com/brendangregg/FlameGraph.git",target:"_blank",rel:"noopener noreferrer"},u=s("h1",{id:"折叠调用栈",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#折叠调用栈","aria-hidden":"true"},"#"),a(" 折叠调用栈")],-1),m=s("p",null,"$ FlameGraph/stackcollapse-perf.pl out.perf > out.folded",-1),v=s("h1",{id:"生成火焰图",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#生成火焰图","aria-hidden":"true"},"#"),a(" 生成火焰图")],-1),b=s("p",null,"$ FlameGraph/flamegraph.pl out.folded > out.svg 　　生成火焰图可以指定参数，–width 可以指定图片宽度，–height 指定每一个调用栈的高度，生成的火焰图，宽度越大就表示CPU耗时越多。",-1);function k(f,h){const n=l("ExternalLinkIcon");return p(),t("div",null,[i,s("p",null,[a("$ git clone --depth 1 "),s("a",d,[a("https://github.com/brendangregg/FlameGraph.git"),r(n)])]),u,m,v,b])}const _=e(c,[["render",k],["__file","linux-perf-cmd.html.vue"]]);export{_ as default};
