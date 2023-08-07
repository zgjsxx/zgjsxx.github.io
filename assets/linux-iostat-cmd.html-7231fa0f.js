import{_ as s,V as n,W as a,a0 as e}from"./framework-9a29aaa0.js";const l={},p=e(`<h1 id="iostat命令详解" tabindex="-1"><a class="header-anchor" href="#iostat命令详解" aria-hidden="true">#</a> iostat命令详解</h1><p>iostat命令是IO性能分析的常用工具，其是input/output statistics的缩写。</p><p>iostat的安装 iostat命令行选项说明 iostat输出内容分析</p><h2 id="命令的安装" tabindex="-1"><a class="header-anchor" href="#命令的安装" aria-hidden="true">#</a> 命令的安装</h2><p>iostat位于sysstat包中，使用yum可以对其进行安装。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> sysstat <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="iostat命令行选项说明" tabindex="-1"><a class="header-anchor" href="#iostat命令行选项说明" aria-hidden="true">#</a> iostat命令行选项说明</h2><ul><li>-c: 显示 CPU 使用情况</li><li>-d: 显示磁盘使用情况</li><li>--dec={ 0 | 1 | 2 }: 指定要使用的小数位数，默认为 2</li><li>-g GROUP_NAME { DEVICE [...] | ALL } 显示一组设备的统计信息</li><li>-H 此选项必须与选项 -g 一起使用，指示只显示组的全局统计信息，而不显示组中单个设备的统计信息</li><li>-h 以可读格式打印大小</li><li>-j { ID | LABEL | PATH | UUID | ... } [ DEVICE [...] | ALL ] 显示永久设备名。选项 ID、LABEL 等用于指定持久名称的类型</li><li>-k 以 KB 为单位显示</li><li>-m 以 MB 为单位显示</li><li>-N 显示磁盘阵列（LVM） 信息</li><li>-n 显示NFS 使用情况</li><li>-p [ { DEVICE [,...] | ALL } ] 显示磁盘和分区的情况</li><li>-t 打印时间戳。时间戳格式可能取决于 S_TIME_FORMAT 环境变量</li><li>-V 显示版本信息并退出</li><li>-x 显示详细信息(显示一些扩展列的数据)</li><li>-y 如果在给定的时间间隔内显示多个记录，则忽略自系统启动以来的第一个统计信息</li><li>-z 省略在采样期间没有活动的任何设备的输出</li></ul><h2 id="iostat输出内容分析" tabindex="-1"><a class="header-anchor" href="#iostat输出内容分析" aria-hidden="true">#</a> iostat输出内容分析</h2><p>在linux命令行中输入iostat，通常将会出现下面的输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@localhost ~<span class="token punctuation">]</span><span class="token comment"># iostat</span>
Linux <span class="token number">5.14</span>.0-284.11.1.el9_2.x86_64 <span class="token punctuation">(</span>localhost.localdomain<span class="token punctuation">)</span>      08/07/2023      _x86_64_        <span class="token punctuation">(</span><span class="token number">4</span> CPU<span class="token punctuation">)</span>

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           <span class="token number">0.31</span>    <span class="token number">0.01</span>    <span class="token number">0.44</span>    <span class="token number">0.02</span>    <span class="token number">0.00</span>   <span class="token number">99.22</span>

Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
dm-0              <span class="token number">3.19</span>        <span class="token number">72.63</span>        <span class="token number">35.90</span>         <span class="token number">0.00</span>     <span class="token number">202007</span>      <span class="token number">99835</span>          <span class="token number">0</span>
dm-1              <span class="token number">0.04</span>         <span class="token number">0.84</span>         <span class="token number">0.00</span>         <span class="token number">0.00</span>       <span class="token number">2348</span>          <span class="token number">0</span>          <span class="token number">0</span>
nvme0n1           <span class="token number">3.36</span>        <span class="token number">93.22</span>        <span class="token number">36.64</span>         <span class="token number">0.00</span>     <span class="token number">259264</span>     <span class="token number">101903</span>          <span class="token number">0</span>
sr0               <span class="token number">0.02</span>         <span class="token number">0.75</span>         <span class="token number">0.00</span>         <span class="token number">0.00</span>       <span class="token number">2096</span>          <span class="token number">0</span>          <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先第一行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Linux <span class="token number">5.14</span>.0-284.11.1.el9_2.x86_64 <span class="token punctuation">(</span>localhost.localdomain<span class="token punctuation">)</span>      08/07/2023      _x86_64_        <span class="token punctuation">(</span><span class="token number">4</span> CPU<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着看第二部分，这部分是CPU的相关信息，其实和top命令的输出是类似的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           <span class="token number">0.31</span>    <span class="token number">0.01</span>    <span class="token number">0.44</span>    <span class="token number">0.02</span>    <span class="token number">0.00</span>   <span class="token number">99.22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>cpu属性值说明：</p><ul><li>%user：CPU处在用户模式下的时间百分比。</li><li>%nice：CPU处在带NICE值的用户模式下的时间百分比。</li><li>%system：CPU处在系统模式下的时间百分比。</li><li>%iowait：CPU等待输入输出完成时间的百分比。</li><li>%steal：管理程序维护另一个虚拟处理器时，虚拟CPU的无意识等待时间百分比。</li><li>%idle：CPU空闲时间百分比。</li></ul><p>如果%iowait的值过高，表示硬盘存在I/O瓶颈，%idle值高，表示CPU较空闲，如果%idle值高但系统响应慢时，有可能是CPU等待分配内存，此时应加大内存容量。%idle值如果持续低于10，那么系统的CPU处理能力相对较低，表明系统中最需要解决的资源是CPU。</p><p>接下来是第三部分</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Device             tps    kB_read/s    kB_wrtn/s    kB_dscd/s    kB_read    kB_wrtn    kB_dscd
dm-0              <span class="token number">3.19</span>        <span class="token number">72.63</span>        <span class="token number">35.90</span>         <span class="token number">0.00</span>     <span class="token number">202007</span>      <span class="token number">99835</span>          <span class="token number">0</span>
dm-1              <span class="token number">0.04</span>         <span class="token number">0.84</span>         <span class="token number">0.00</span>         <span class="token number">0.00</span>       <span class="token number">2348</span>          <span class="token number">0</span>          <span class="token number">0</span>
nvme0n1           <span class="token number">3.36</span>        <span class="token number">93.22</span>        <span class="token number">36.64</span>         <span class="token number">0.00</span>     <span class="token number">259264</span>     <span class="token number">101903</span>          <span class="token number">0</span>
sr0               <span class="token number">0.02</span>         <span class="token number">0.75</span>         <span class="token number">0.00</span>         <span class="token number">0.00</span>       <span class="token number">2096</span>          <span class="token number">0</span>          <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Device：/dev 目录下的磁盘（或分区）名称</li><li>tps：该设备每秒的传输次数。一次传输即一次 I/O 请求，多个逻辑请求可能会被合并为一次 I/O 请求。一次传输请求的大小是未知的</li><li>kB_read/s：每秒从磁盘读取数据大小，单位KB/s</li><li>kB_wrtn/s：每秒写入磁盘的数据的大小，单位KB/s</li><li>kB_dscd/s: 每秒磁盘的丢块数，单数KB/s</li><li>kB_read：从磁盘读出的数据总数，单位KB</li><li>kB_wrtn：写入磁盘的的数据总数，单位KB</li><li>kB_dscd: 磁盘总的丢块数量</li></ul><p>iostat 可以使用-x输出一些扩展列，例如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Device            r/s     rkB/s   rrqm/s  %rrqm r_await rareq-sz     w/s     wkB/s   wrqm/s  %wrqm w_await wareq-sz     d/s     dkB/s   drqm/s  %drqm d_await dareq-sz     f/s f_await  aqu-sz  %util
dm-0             <span class="token number">2.16</span>     <span class="token number">47.69</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.56</span>    <span class="token number">22.06</span>    <span class="token number">0.88</span>     <span class="token number">25.70</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">2.66</span>    <span class="token number">29.16</span>    <span class="token number">0.00</span>      <span class="token number">0.00</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.00</span>     <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>   <span class="token number">0.25</span>
dm-1             <span class="token number">0.02</span>      <span class="token number">0.49</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.30</span>    <span class="token number">23.72</span>    <span class="token number">0.00</span>      <span class="token number">0.00</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.00</span>     <span class="token number">0.00</span>    <span class="token number">0.00</span>      <span class="token number">0.00</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.00</span>     <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>   <span class="token number">0.00</span>
nvme0n1          <span class="token number">2.28</span>     <span class="token number">59.76</span>     <span class="token number">0.01</span>   <span class="token number">0.38</span>    <span class="token number">0.54</span>    <span class="token number">26.18</span>    <span class="token number">0.74</span>     <span class="token number">26.13</span>     <span class="token number">0.15</span>  <span class="token number">17.11</span>    <span class="token number">1.89</span>    <span class="token number">35.12</span>    <span class="token number">0.00</span>      <span class="token number">0.00</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.00</span>     <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>   <span class="token number">0.26</span>
sr0              <span class="token number">0.01</span>      <span class="token number">0.44</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.56</span>    <span class="token number">38.81</span>    <span class="token number">0.00</span>      <span class="token number">0.00</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.00</span>     <span class="token number">0.00</span>    <span class="token number">0.00</span>      <span class="token number">0.00</span>     <span class="token number">0.00</span>   <span class="token number">0.00</span>    <span class="token number">0.00</span>     <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>    <span class="token number">0.00</span>   <span class="token number">0.00</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>r/s：每秒向磁盘发起的读操作数</li><li>w/s：每秒向磁盘发起的写操作数</li><li>rkB/s：每秒读K字节数</li><li>wkB/s:每秒写K字节数</li><li>rrqm/s：每秒这个设备相关的读取请求有多少被Merge了（当系统调用需要读取数据的时候，VFS将请求发到各个FS，如果FS发现不同的读取请求读取的是相同Block的数据，FS会将这个请求合并Merge）；</li><li>wrqm/s：每秒这个设备相关的写入请求有多少被Merge了。</li><li>avgrq-sz： 平均每次设备I/O操作的数据大小</li><li>avgqu-sz： 平均I/O队列长度。</li><li>await： 每一个IO请求的处理的平均时间（单位是微秒毫秒）。这里可以理解为IO的响应时间，一般地系统IO响应时间应该低于5ms，如果大于10ms就比较大了。 这个时间包括了队列时间和服务时间，也就是说，一般情况下，await大于svctm，它们的差值越小，则说明队列时间越短，反之差值越大，队列时间越长，说明系统出了问题。</li><li>r_await：每个读操作平均所需的时间；不仅包括硬盘设备读操作的时间，还包括了在kernel队列中等待的时间</li><li>w_await：每个写操作平均所需的时间；不仅包括硬盘设备写操作的时间，还包括了在kernel队列中等待的时间</li><li>%util：在统计时间内所有处理IO时间，除以总共统计时间。例如，如果统计间隔1秒，该设备有0.8秒在处理IO，而0.2秒闲置，那么该设备的%util = 0.8/1 = 80%，所以该参数暗示了设备的繁忙程度。一般地，如果该参数是100%表示设备已经接近满负荷运行了（当然如果是多磁盘，即使%util是100%，因为磁盘的并发能力，所以磁盘使用未必就到了瓶颈）。</li></ul><h2 id="性能监控指标" tabindex="-1"><a class="header-anchor" href="#性能监控指标" aria-hidden="true">#</a> 性能监控指标</h2><p>上面说了这么多，也看了那么多的系统输出，那我们在日常运维中到底需要关注哪些字段呢？下面就来说说这篇文章的重点了，我们到底该关注哪些输出内容就可以确定这台服务器是否存在IO性能瓶颈。</p><ul><li>%iowait：如果该值较高，表示磁盘存在I/O瓶颈</li><li>await：一般地，系统I/O响应时间应该低于5ms，如果大于10ms就比较大了</li><li>avgqu-sz：如果I/O请求压力持续超出磁盘处理能力，该值将增加。如果单块磁盘的队列长度持续超过2，一般认为该磁盘存在I/O性能问题。需要注意的是，如果该磁盘为磁盘阵列虚拟的逻辑驱动器，需要再将该值除以组成这个逻辑驱动器的实际物理磁盘数目，以获得平均单块硬盘的I/O等待队列长度</li><li>%util：一般地，如果该参数是100%表示设备已经接近满负荷运行了</li></ul><p>最后，除了关注指标外，我们更需要结合部署的业务进行分析。对于磁盘随机读写频繁的业务，比如图片存取、数据库、邮件服务器等，此类业务吗，tps才是关键点。对于顺序读写频繁的业务，需要传输大块数据的，如视频点播、文件同步，关注的是磁盘的吞吐量。</p>`,28),t=[p];function i(r,c){return n(),a("div",null,t)}const o=s(l,[["render",i],["__file","linux-iostat-cmd.html.vue"]]);export{o as default};
