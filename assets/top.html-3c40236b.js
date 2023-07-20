import{_ as s,V as n,W as a,a0 as e}from"./framework-9a29aaa0.js";const p={},l=e(`<h1 id="top命令详解" tabindex="-1"><a class="header-anchor" href="#top命令详解" aria-hidden="true">#</a> top命令详解</h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><figure><img src="https://raw.githubusercontent.com/zgjsxx/static-img-repo/main/blog/tool/top/windows_task_manger.png" alt="git ssh key" tabindex="0" loading="lazy"><figcaption>git ssh key</figcaption></figure><h2 id="top命令内容" tabindex="-1"><a class="header-anchor" href="#top命令内容" aria-hidden="true">#</a> top命令内容</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">top</span> - <span class="token number">10</span>:32:42 up <span class="token number">38</span> min,  <span class="token number">2</span> users,  load average: <span class="token number">0.00</span>, <span class="token number">0.00</span>, <span class="token number">0.00</span>
Tasks: <span class="token number">237</span> total,   <span class="token number">1</span> running, <span class="token number">236</span> sleeping,   <span class="token number">0</span> stopped,   <span class="token number">0</span> zombie
%Cpu<span class="token punctuation">(</span>s<span class="token punctuation">)</span>:  <span class="token number">0.3</span> us,  <span class="token number">0.4</span> sy,  <span class="token number">0.0</span> ni, <span class="token number">99.1</span> id,  <span class="token number">0.0</span> wa,  <span class="token number">0.1</span> hi,  <span class="token number">0.1</span> si,  <span class="token number">0.0</span> st
MiB Mem <span class="token builtin class-name">:</span>   <span class="token number">3635.0</span> total,   <span class="token number">3229.8</span> free,    <span class="token number">441.0</span> used,    <span class="token number">170.1</span> buff/cache
MiB Swap:   <span class="token number">2072.0</span> total,   <span class="token number">2072.0</span> free,      <span class="token number">0.0</span> used.   <span class="token number">3194.0</span> avail Mem

    PID <span class="token environment constant">USER</span>      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   <span class="token number">1461</span> root      <span class="token number">20</span>   <span class="token number">0</span>    <span class="token number">7252</span>   <span class="token number">3672</span>   <span class="token number">3280</span> S   <span class="token number">0.7</span>   <span class="token number">0.1</span>   <span class="token number">0</span>:00.03 <span class="token function">bash</span>
   <span class="token number">1621</span> root      <span class="token number">20</span>   <span class="token number">0</span>   <span class="token number">10700</span>   <span class="token number">4360</span>   <span class="token number">3476</span> R   <span class="token number">0.7</span>   <span class="token number">0.1</span>   <span class="token number">0</span>:00.05 <span class="token function">top</span>
   <span class="token number">1477</span> root      <span class="token number">20</span>   <span class="token number">0</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.3</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.01 kworker/0:0-events
      <span class="token number">1</span> root      <span class="token number">20</span>   <span class="token number">0</span>  <span class="token number">103372</span>  <span class="token number">12748</span>   <span class="token number">9724</span> S   <span class="token number">0.0</span>   <span class="token number">0.3</span>   <span class="token number">0</span>:02.18 systemd
      <span class="token number">2</span> root      <span class="token number">20</span>   <span class="token number">0</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> S   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.04 kthreadd
      <span class="token number">3</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 rcu_gp
      <span class="token number">4</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 rcu_par_gp
      <span class="token number">5</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 slub_flushwq
      <span class="token number">6</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 netns
      <span class="token number">8</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 kworker/0:0H-events_highpri
     <span class="token number">10</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 kworker/0:1H-events_highpri
     <span class="token number">11</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 mm_percpu_wq
     <span class="token number">13</span> root      <span class="token number">20</span>   <span class="token number">0</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 rcu_tasks_kthre
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先看看第一行代表什么？</p><p>第一行其实代表了系统的启动时间和系统的平均负载。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">top</span> - <span class="token number">10</span>:32:42 up <span class="token number">38</span> min,  <span class="token number">2</span> users,  load average: <span class="token number">0.00</span>, <span class="token number">0.00</span>, <span class="token number">0.00</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>top - 10:32:42 up 38 min </code>代表当前系统的时间是<code>10:32:42</code>，并且该机器已经启动了<code>38 min</code>。<code>2 users</code>代表当前有两个用户登录。<code>load average: 0.00, 0.00, 0.00</code>代表的是系统最近5、10和15分钟内的平均负载。</p><p>这里需要注意的是平均负载并不是代表CPU的使用率。简单来说，<strong>平均负载</strong>是指单位时间内，系统处于<strong>可运行状态</strong>和<strong>不可中断状态</strong>的平均进程数，也就是<strong>平均活跃进程数</strong>。</p><p>所谓可运行状态和不可中断状态是指：</p><ul><li>可运行状态(R)：正在CPU上运行或者正在等待CPU的进程状态，如上；</li><li>不可中断状态(D)：不可中断是指一些正在处于内核关键流程的进程，如果盲目打断，会造成不可预知的后果，比如正在写磁盘的进程，盲目被打断，可能会造成读写不一致的问题。</li></ul><p>因此这里再次强调load average和CPU使用率并没有直接关系，其值可以大于100。</p><p>其实第一行的显示数据和命令<code>uptime</code>的作用是一样的。</p><p>第二行显示的是关于进程状态的总结。</p><p>进程可以处于不同的状态。这里显示了全部进程的数量。除此之外，还有正在运行、睡眠、停止、僵尸进程的数量。</p><p>例如下面的显示， 系统总共有237个进程，其中1个进程处于running状态，236个进程处于sleeping状态，0个进程处于stop状态，0个进程处于僵尸进程状态。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Tasks: <span class="token number">237</span> total,   <span class="token number">1</span> running, <span class="token number">236</span> sleeping,   <span class="token number">0</span> stopped,   <span class="token number">0</span> zombie
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第三行是比较关键的一行，线上定位问题的时候，会经常关注这个点。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>%Cpu<span class="token punctuation">(</span>s<span class="token punctuation">)</span>:  <span class="token number">0.3</span> us,  <span class="token number">0.4</span> sy,  <span class="token number">0.0</span> ni, <span class="token number">99.1</span> id,  <span class="token number">0.0</span> wa,  <span class="token number">0.1</span> hi,  <span class="token number">0.1</span> si,  <span class="token number">0.0</span> st
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里的每一个参数的含义如下所示：</p><ul><li>us, user： 运行(未调整优先级的) 用户进程的CPU时间</li><li>sy，system: 运行内核进程的CPU时间</li><li>ni，niced：运行已调整优先级的用户进程的CPU时间</li><li>wa，IO wait: 用于等待IO完成的CPU时间</li><li>hi：处理硬件中断的CPU时间</li><li>si: 处理软件中断的CPU时间</li><li>st：这个虚拟机被hypervisor偷去的CPU时间（译注：如果当前处于一个hypervisor下的vm，实际上hypervisor也是要消耗一部分CPU处理时间的）。</li></ul><p>第四部分是关于内存部分的数据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>MiB Mem <span class="token builtin class-name">:</span>   <span class="token number">3635.0</span> total,   <span class="token number">3229.8</span> free,    <span class="token number">441.0</span> used,    <span class="token number">170.1</span> buff/cache
MiB Swap:   <span class="token number">2072.0</span> total,   <span class="token number">2072.0</span> free,      <span class="token number">0.0</span> used.   <span class="token number">3194.0</span> avail Mem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第五部分是关于每个进程的数据：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>    PID <span class="token environment constant">USER</span>      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   <span class="token number">1461</span> root      <span class="token number">20</span>   <span class="token number">0</span>    <span class="token number">7252</span>   <span class="token number">3672</span>   <span class="token number">3280</span> S   <span class="token number">0.7</span>   <span class="token number">0.1</span>   <span class="token number">0</span>:00.03 <span class="token function">bash</span>
   <span class="token number">1621</span> root      <span class="token number">20</span>   <span class="token number">0</span>   <span class="token number">10700</span>   <span class="token number">4360</span>   <span class="token number">3476</span> R   <span class="token number">0.7</span>   <span class="token number">0.1</span>   <span class="token number">0</span>:00.05 <span class="token function">top</span>
   <span class="token number">1477</span> root      <span class="token number">20</span>   <span class="token number">0</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.3</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.01 kworker/0:0-events
      <span class="token number">1</span> root      <span class="token number">20</span>   <span class="token number">0</span>  <span class="token number">103372</span>  <span class="token number">12748</span>   <span class="token number">9724</span> S   <span class="token number">0.0</span>   <span class="token number">0.3</span>   <span class="token number">0</span>:02.18 systemd
      <span class="token number">2</span> root      <span class="token number">20</span>   <span class="token number">0</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> S   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.04 kthreadd
      <span class="token number">3</span> root       <span class="token number">0</span> <span class="token parameter variable">-20</span>       <span class="token number">0</span>      <span class="token number">0</span>      <span class="token number">0</span> I   <span class="token number">0.0</span>   <span class="token number">0.0</span>   <span class="token number">0</span>:00.00 rcu_gp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在横向列出的系统属性和状态下面，是以列显示的进程。不同的列代表下面要解释的不同属性。</p><ul><li>PID：进程ID，进程的唯一标识符</li><li>USER：进程所有者的实际用户名。</li><li>PR：进程的调度优先级。这个字段的一些值是&#39;rt&#39;。这意味这这些进程运行在实时态。</li><li>NI：进程的nice值（优先级)。NI的值处于[-20, 19]，越小的值意味着越高的优先级。</li><li>VIRT：进程使用的虚拟内存。</li><li>RES：驻留内存大小。驻留内存是任务使用的非交换物理内存大小。</li><li>SHR：SHR是进程使用的共享内存。</li><li>S：这个是进程的状态。它有以下不同的值: <ul><li>D – 不可中断的睡眠态。</li><li>R – 运行态</li><li>S – 睡眠态</li><li>T – 被跟踪或已停止</li><li>Z – 僵尸态</li></ul></li><li>CPU：自从上一次更新时到现在任务所使用的CPU时间百分比。</li><li>MEM：进程使用的可用物理内存百分比。</li><li>TIME：任务启动后到现在所使用的全部CPU时间，精确到百分之一秒。</li><li>COMMAND：运行进程所使用的命令。</li></ul><h2 id="使用技巧" tabindex="-1"><a class="header-anchor" href="#使用技巧" aria-hidden="true">#</a> 使用技巧</h2><h3 id="多核cpu监控" tabindex="-1"><a class="header-anchor" href="#多核cpu监控" aria-hidden="true">#</a> 多核CPU监控</h3><p>在top的基本视图中，按数字1，可以监控每个逻辑CPU的状况，例如下面的例子，我的虚拟机包含了4个cpu，这里显示了4个CPU的运行状况。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">top</span> - <span class="token number">13</span>:35:11 up  <span class="token number">3</span>:40,  <span class="token number">2</span> users,  load average: <span class="token number">0.00</span>, <span class="token number">0.02</span>, <span class="token number">0.00</span>
Tasks: <span class="token number">234</span> total,   <span class="token number">1</span> running, <span class="token number">233</span> sleeping,   <span class="token number">0</span> stopped,   <span class="token number">0</span> zombie
%Cpu0  <span class="token builtin class-name">:</span>  <span class="token number">0.3</span> us,  <span class="token number">0.7</span> sy,  <span class="token number">0.0</span> ni, <span class="token number">98.7</span> id,  <span class="token number">0.0</span> wa,  <span class="token number">0.3</span> hi,  <span class="token number">0.0</span> si,  <span class="token number">0.0</span> st
%Cpu1  <span class="token builtin class-name">:</span>  <span class="token number">0.7</span> us,  <span class="token number">0.3</span> sy,  <span class="token number">0.0</span> ni, <span class="token number">98.7</span> id,  <span class="token number">0.0</span> wa,  <span class="token number">0.0</span> hi,  <span class="token number">0.3</span> si,  <span class="token number">0.0</span> st
%Cpu2  <span class="token builtin class-name">:</span>  <span class="token number">0.3</span> us,  <span class="token number">0.7</span> sy,  <span class="token number">0.0</span> ni, <span class="token number">99.0</span> id,  <span class="token number">0.0</span> wa,  <span class="token number">0.0</span> hi,  <span class="token number">0.0</span> si,  <span class="token number">0.0</span> st
%Cpu3  <span class="token builtin class-name">:</span>  <span class="token number">0.3</span> us,  <span class="token number">0.3</span> sy,  <span class="token number">0.0</span> ni, <span class="token number">99.3</span> id,  <span class="token number">0.0</span> wa,  <span class="token number">0.0</span> hi,  <span class="token number">0.0</span> si,  <span class="token number">0.0</span> st
MiB Mem <span class="token builtin class-name">:</span>   <span class="token number">3635.0</span> total,   <span class="token number">3188.5</span> free,    <span class="token number">461.1</span> used,    <span class="token number">209.5</span> buff/cache
MiB Swap:   <span class="token number">2072.0</span> total,   <span class="token number">2072.0</span> free,      <span class="token number">0.0</span> used.   <span class="token number">3173.9</span> avail Mem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高亮显示当前运行进程" tabindex="-1"><a class="header-anchor" href="#高亮显示当前运行进程" aria-hidden="true">#</a> 高亮显示当前运行进程</h2>`,33),r=[l];function t(o,c){return n(),a("div",null,r)}const m=s(p,[["render",t],["__file","top.html.vue"]]);export{m as default};
