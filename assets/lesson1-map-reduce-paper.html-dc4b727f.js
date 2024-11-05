import{_ as e,V as n,W as i,a0 as a}from"./framework-9a29aaa0.js";const s={},l=a(`<ul><li><a href="#mapreduce%E5%A4%A7%E5%9E%8B%E9%9B%86%E7%BE%A4%E4%B8%8A%E7%9A%84%E7%AE%80%E5%8C%96%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86">MapReduce：大型集群上的简化数据处理</a><ul><li><a href="#%E6%91%98%E8%A6%81">摘要</a></li><li><a href="#1%E4%BB%8B%E7%BB%8D">1.介绍</a></li><li><a href="#2%E7%BC%96%E7%A8%8B%E6%A8%A1%E5%9E%8B">2.编程模型</a><ul><li><a href="#21-%E4%BE%8B%E5%AD%90">2.1 例子</a></li><li><a href="#22-%E7%B1%BB%E5%9E%8B">2.2 类型</a></li><li><a href="#23-%E6%9B%B4%E5%A4%9A%E7%9A%84%E4%BE%8B%E5%AD%90">2.3 更多的例子</a></li><li><a href="#3%E5%AE%9E%E7%8E%B0">3.实现</a></li><li><a href="#31-%E6%89%A7%E8%A1%8C%E6%A6%82%E8%BF%B0">3.1 执行概述</a></li><li><a href="#32-%E4%B8%BB%E8%8A%82%E7%82%B9%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84">3.2 主节点的数据结构</a></li><li><a href="#33-%E5%AE%B9%E9%94%99%E6%80%A7">3.3 容错性</a></li></ul></li><li><a href="#%E9%99%84%E5%BD%95a">附录A</a></li></ul></li></ul><h1 id="mapreduce-大型集群上的简化数据处理" tabindex="-1"><a class="header-anchor" href="#mapreduce-大型集群上的简化数据处理" aria-hidden="true">#</a> MapReduce：大型集群上的简化数据处理</h1><h2 id="摘要" tabindex="-1"><a class="header-anchor" href="#摘要" aria-hidden="true">#</a> 摘要</h2><p>MapReduce 是一种编程模型以及相关的用于处理和生成大型数据集的实现。用户指定一个映射函数，该函数处理键值对以生成一组中间键值对，以及一个归约函数，该函数合并与同一中间键相关联的所有中间值。正如论文中所示，许多现实世界中的任务都可以用这个模型来表达。</p><p>用这种函数式风格编写的程序会自动并行化，并在一个由大量商品机器组成的大型集群上执行。运行时系统负责处理输入数据分区的细节、在一组机器上调度程序的执行、处理机器故障以及管理所需的机器间通信。这使得没有任何并行和分布式系统经验的程序员能够轻松利用大型分布式系统的资源。</p><p>我们的 MapReduce 实现运行在一个由大量商品机器组成的大型集群上，并且具有高度的可扩展性：一个典型的 MapReduce 计算在数千台机器上处理许多太字节的数据。程序员发现这个系统易于使用：已经实现了数百个 MapReduce 程序，并且每天在谷歌的集群上执行多达一千个 MapReduce 作业。</p><h2 id="_1-介绍" tabindex="-1"><a class="header-anchor" href="#_1-介绍" aria-hidden="true">#</a> 1.介绍</h2><p>在过去的五年里，作者和谷歌的许多其他人已经实现了数百个特殊用途的计算，这些计算处理大量的原始数据，例如抓取的文档、网络请求日志等，以计算各种派生数据，如倒排索引、网络文档图形结构的各种表示、每个主机抓取的页面数量摘要、给定日期中最频繁的查询集合等。大多数这样的计算在概念上是直接明了的。然而，输入数据通常很大，并且为了在合理的时间内完成计算，这些计算必须分布在数百或数千台机器上。如何并行化计算、分布数据以及处理故障等问题共同作用，使得原本简单的计算被大量复杂的代码所掩盖，这些代码是用来处理这些问题的。</p><p>作为对这种复杂性的一种回应，我们设计了一种新的抽象概念，它允许我们表达我们试图执行的简单计算，同时将并行化、容错、数据分布和负载均衡等杂乱的细节隐藏在一个库中。我们的抽象概念受到 Lisp 和许多其他函数式语言中存在的 map（映射）和 reduce（归约）原语的启发。我们意识到，我们的大多数计算都涉及对输入中的每个逻辑 &quot;记录&quot; 应用一个映射操作，以便计算<strong>一组中间键值对</strong>，然后对<strong>具有相同键的所有值应用一个归约操作</strong>，以便适当地组合派生数据。我们使用带有用户指定的映射和归约操作的函数式模型，使得我们能够轻松地并行化大型计算，并将重新执行作为容错的主要机制。</p><p>这项工作的主要贡献在于提供了一个简单而强大的接口，能够实现大规模计算的自动并行化和分布，同时结合了该接口的一种实现，在由大量商用个人电脑组成的大型集群上实现了高性能。</p><p>下面是论文的组织结构：</p><ul><li>第 2 节描述了基本的编程模型并给出了几个例子。</li><li>第 3 节描述了针对我们的基于集群的计算环境而定制的 MapReduce 接口的一种实现。</li><li>第 4 节描述了我们发现有用的编程模型的几个改进之处。</li><li>第 5 节对我们的实现针对各种任务进行了性能测量。</li><li>第 6 节探讨了 MapReduce 在谷歌内部的使用，包括我们将其用作重写我们的生产索引系统的基础的经验。</li><li>第 7 节讨论了相关工作和未来的工作。</li></ul><h2 id="_2-编程模型" tabindex="-1"><a class="header-anchor" href="#_2-编程模型" aria-hidden="true">#</a> 2.编程模型</h2><p>该计算接收一组输入键值对，并生成一组输出键值对。MapReduce 库的用户将计算表示为两个函数：Map（映射）和 Reduce（归约）。</p><p>Map（映射）函数由用户编写，接收一个输入键值对并生成一组中间键值对。MapReduce 库将所有与同一中间键 I 相关联的中间值组合在一起，并将它们传递给 Reduce（归约）函数。</p><p>Reduce（归约）函数，同样由用户编写，接收一个中间键 I 和该键的一组值。它将这些值合并在一起以形成一个可能更小的值集合。通常每次调用 Reduce 函数只会产生零个或一个输出值。中间值通过迭代器提供给用户的归约函数。这使得我们能够处理那些大到无法在内存中容纳的值列表。</p><h3 id="_2-1-例子" tabindex="-1"><a class="header-anchor" href="#_2-1-例子" aria-hidden="true">#</a> 2.1 例子</h3><p>考虑在大量文档集合中计算每个单词出现次数的问题。用户会编写类似于以下伪代码的代码：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>map<span class="token punctuation">(</span>String key, String value<span class="token punctuation">)</span>:
    // key: document name
    // value: document contents
    <span class="token keyword">for</span> each word w <span class="token keyword">in</span> value:
        EmitIntermediate<span class="token punctuation">(</span>w, <span class="token string">&quot;1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

reduce<span class="token punctuation">(</span>String key, Iterator values<span class="token punctuation">)</span>:
    // key: a word
    // values: a list of counts
    int result <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> each <span class="token function">v</span> <span class="token keyword">in</span> values:
        result <span class="token operator">+=</span> ParseInt<span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
        Emit<span class="token punctuation">(</span>AsString<span class="token punctuation">(</span>result<span class="token punctuation">))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>映射函数发出每个单词以及相关的出现次数计数（在这个简单的例子中只是 &quot;1&quot;）。归约函数将针对特定单词发出的所有计数相加求和。</p><p>此外，用户编写代码以用输入和输出文件的名称以及可选的调优参数来填充一个 MapReduce 规范对象。然后，用户调用 MapReduce 函数，将规范对象传递给它。用户的代码与用 C++ 实现的 MapReduce 库链接在一起。附录 A 包含了这个示例的完整程序文本。</p><h3 id="_2-2-类型" tabindex="-1"><a class="header-anchor" href="#_2-2-类型" aria-hidden="true">#</a> 2.2 类型</h3><p>尽管前面的伪代码是根据字符串输入和输出来编写的，但从概念上讲，用户提供的映射和归约函数具有相关联的类型：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>map <span class="token punctuation">(</span>k1,v1<span class="token punctuation">)</span> → list <span class="token punctuation">(</span>k2,v2<span class="token punctuation">)</span>
reduce <span class="token punctuation">(</span>k2,list <span class="token punctuation">(</span>v2<span class="token punctuation">))</span> → list <span class="token punctuation">(</span>v2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，输入键和值来自与输出键和值不同的域。此外，中间键和值与输出键和值来自相同的域。 我们的 C++ 实现将字符串传递给用户定义的函数以及从用户定义的函数接收字符串，并将字符串与适当类型之间的转换留给用户代码来完成。</p><h3 id="_2-3-更多的例子" tabindex="-1"><a class="header-anchor" href="#_2-3-更多的例子" aria-hidden="true">#</a> 2.3 更多的例子</h3><p>以下是一些可以很容易地表示为 MapReduce 计算的有趣程序的简单例子。</p><p><strong>分布式 grep</strong>：如果一行匹配给定的模式，映射函数就输出这一行。归约函数是一个恒等函数，它只是将提供的中间数据复制到输出中。</p><p><strong>URL 访问频率计数</strong>：映射函数处理网页请求日志并输出 <code>&lt;URL, 1&gt;</code>。归约函数将相同 URL 的所有值相加，并输出<code>&lt; URL, 总计数 &gt;</code> 对。</p><p><strong>反向网页链接图</strong>：对于在名为 source 的页面中找到的每个指向目标 URL 的链接，映射函数输出 <code>&lt; target, source &gt;</code> 对。归约函数将与给定目标 URL 相关联的所有源 URL 列表连接起来，并输出 <code>&lt; target, 源列表 &gt;</code> 对。</p><p><strong>每个主机的词向量</strong>：词向量将一个文档或一组文档中出现的最重要的词总结为 <code>&lt; hword, frequency &gt;</code> 对的列表。对于每个输入文档，映射函数输出 <code>&lt; hostname, 词向量 &gt;</code> 对（其中主机名是从文档的 URL 中提取的）。归约函数接收给定主机的所有每个文档的词向量。它将这些词向量相加，丢弃不常出现的词，然后输出最终的 <code>&lt; hostname, 词向量 &gt;</code> 对。</p><p><strong>倒排索引</strong>：映射函数解析每个文档，并输出一系列 <code>&lt;word（单词）, document ID（文档 ID）&gt;</code> 对。归约函数接收给定单词的所有对，对相应的文档 ID 进行排序，并输出 <code>&lt; word, list (document ID)&gt;</code> 对。所有输出对的集合形成一个简单的倒排索引。很容易扩展这个计算以跟踪单词位置。</p><p><strong>分布式排序</strong>：映射函数从每个记录中提取键，并输出 <code>&lt; key（键）, record（记录）&gt;</code> 对。归约函数原封不动地输出所有对。这个计算依赖于第 4.1 节中描述的分区功能和第 4.2 节中描述的排序属性。</p><h3 id="_3-实现" tabindex="-1"><a class="header-anchor" href="#_3-实现" aria-hidden="true">#</a> 3.实现</h3><p>MapReduce 接口有许多不同的实现方式是可能的。正确的选择取决于环境。例如，一种实现可能适用于小型共享内存机器，另一种适用于大型 NUMA 多处理器，还有一种适用于更大规模的联网机器集合。</p><p>本节描述一种针对谷歌广泛使用的计算环境的实现：由通过交换式以太网连接在一起的大量商品个人电脑组成的大型集群。在我们的环境中：</p><ul><li>1.机器通常是运行 Linux 的双处理器 x86 处理器，每台机器有 2 - 4GB 的内存。</li><li>2.使用商品网络硬件 —— 在机器层面通常是 100 兆比特 / 秒或 1 千兆比特 / 秒，但整体的二分带宽平均要小得多。</li><li>3.一个集群由数百或数千台机器组成，因此机器故障很常见。</li><li>4.存储由直接连接到各个机器的廉价 IDE 磁盘提供。内部开发的一个分布式文件系统用于管理存储在这些磁盘上的数据。该文件系统使用复制在不可靠的硬件之上提供可用性和可靠性。</li><li>5.用户将作业提交给一个调度系统。每个作业由一组任务组成，并且由调度程序映射到一个集群内的一组可用机器上。</li></ul><h3 id="_3-1-执行概述" tabindex="-1"><a class="header-anchor" href="#_3-1-执行概述" aria-hidden="true">#</a> 3.1 执行概述</h3><p>通过自动将输入数据划分成一组 M 个分片，映射调用被分布在多台机器上。输入分片可以由不同的机器并行处理。归约调用通过使用分区函数（例如，hash (key) mod R）将中间键空间划分为 R 个部分来进行分布。分区的数量（R）和分区函数由用户指定。</p><p>图 1 展示了在我们的实现中 MapReduce 操作的总体流程。当用户程序调用 MapReduce 函数时，会发生以下一系列动作（图 1 中的编号标签与下面列表中的数字相对应）：</p><figure><img src="https://github.com/zgjsxx/static-img-repo/raw/main/blog/lesson/6.824/lesson1/paper/fig1-execution-overview.png" alt="map-reduce执行流程" tabindex="0" loading="lazy"><figcaption>map-reduce执行流程</figcaption></figure><ul><li><p>1.用户程序中的 MapReduce 库首先将输入文件分割成 M 个部分，通常每个部分为 16 兆字节到 64 兆字节（用户可以通过一个可选参数进行控制）。然后，它在一个机器集群上启动该程序的多个副本。</p></li><li><p>2.程序副本中有一个是特殊的 —— 主节点。其余的都是由主节点分配工作的工作节点。有 M 个映射任务和 R 个归约任务需要分配。主节点挑选空闲的工作节点，并为每个工作节点分配一个映射任务或归约任务。</p></li><li><p>3.被分配了映射任务的工作节点读取相应输入分片的内容。它从输入数据中解析出键值对，并将每一对传递给用户定义的映射函数。由映射函数生成的中间键值对被缓存在内存中。</p></li><li><p>4.定期地，缓冲的键值对被写入本地磁盘，并通过分区函数被划分成 R 个区域。这些缓冲键值对在本地磁盘上的位置被传回给主节点，主节点负责将这些位置转发给归约工作节点。</p></li><li><ol start="5"><li>当归约工作节点被主节点通知这些位置时，它使用远程过程调用从映射工作节点的本地磁盘读取缓冲数据。当归约工作节点读取了所有中间数据后，它按照中间键对数据进行排序，以便相同键的所有出现都被分组在一起。排序是必要的，因为通常许多不同的键会映射到同一个归约任务。如果中间数据的量太大而无法放入内存中，则使用外部排序。</li></ol></li><li><ol start="6"><li>归约工作节点遍历已排序的中间数据，对于遇到的每个唯一中间键，它将键和相应的中间值集合传递给用户的归约函数。归约函数的输出被附加到这个归约分区的最终输出文件中。</li></ol></li><li><ol start="7"><li>当所有映射任务和归约任务都已完成时，主节点唤醒用户程序。此时，用户程序中的 MapReduce 调用返回到用户代码。成功完成后，MapReduce 执行的输出可在 R 个输出文件中获得（每个归约任务一个文件，文件名由用户指定）。通常，用户不需要将这 R 个输出文件合并为一个文件 —— 他们经常将这些文件作为输入传递给另一个 MapReduce 调用，或者在另一个能够处理被划分到多个文件中的输入的分布式应用程序中使用它们。</li></ol></li></ul><p>成功完成后，MapReduce 执行的输出可在 R 个输出文件中获得（每个归约任务一个文件，文件名由用户指定）。通常，用户不需要将这 R 个输出文件合并为一个文件 —— 他们常常将这些文件作为输入传递给另一个 MapReduce 调用，或者在另一个能够处理被划分到多个文件中的输入的分布式应用程序中使用它们。</p><h3 id="_3-2-主节点的数据结构" tabindex="-1"><a class="header-anchor" href="#_3-2-主节点的数据结构" aria-hidden="true">#</a> 3.2 主节点的数据结构</h3><p>主节点保存下面这些数据结构：</p><ul><li>对于每个映射任务和归约任务，它存储任务的状态（空闲、进行中或已完成）</li><li>工作机器的标识（对于非空闲任务）。</li></ul><p>主节点是中间文件区域的位置信息从映射任务传播到归约任务的通道。因此，对于每个已完成的映射任务，主节点存储该映射任务生成的 R 个中间文件区域的位置和大小。随着映射任务的完成，会接收到对这个位置和大小信息的更新。这些信息会逐渐推送给正在进行归约任务的工作节点。</p><h3 id="_3-3-容错性" tabindex="-1"><a class="header-anchor" href="#_3-3-容错性" aria-hidden="true">#</a> 3.3 容错性</h3><p>由于 MapReduce 库被设计用于帮助使用数百或数千台机器处理非常大量的数据，所以该库必须优雅地容忍机器故障。</p><p><strong>工作节点故障</strong></p><p>主节点定期向每个工作节点发送 &quot;心跳&quot; 信号。如果在特定时间内没有收到某个工作节点的响应，主节点就将该工作节点标记为故障状态。由该故障工作节点已完成的任何映射任务都被重置回初始的空闲状态，因此有资格被调度到其他工作节点上执行。类似地，在故障工作节点上正在进行的任何映射任务或归约任务也被重置为空闲状态，并有资格被重新调度。</p><p>已完成的映射任务在出现故障时会被重新执行，因为它们的输出存储在故障机器的本地磁盘上，因此无法访问。已完成的归约任务不需要重新执行，因为它们的输出存储在全局文件系统中。</p><p>当一个映射任务先由工作节点 A 执行，然后由于 A 出现故障而由工作节点 B 执行时，所有执行归约任务的工作节点都会收到重新执行的通知。任何尚未从工作节点 A 读取数据的归约任务将从工作节点 B 读取数据。</p><p>MapReduce 对大规模的工作节点故障具有弹性。例如，在一次 MapReduce 操作中，正在运行的集群上的网络维护导致一次有 80 台机器的组在几分钟内无法访问。MapReduce 主节点只是重新执行了那些无法访问的工作节点所做的工作，并继续向前推进，最终完成了 MapReduce 操作。</p><p><strong>主节点故障</strong></p><p>让主节点定期对上述主节点的数据结构进行检查点写入是很容易的。如果主节点任务死亡，可以从最后一个检查点的状态启动一个新的副本。然而，鉴于只有一个主节点，它出现故障的可能性不大；因此，我们当前的实现如果主节点出现故障就会中止 MapReduce 计算。客户端可以检查这种情况，如果需要，可以重试 MapReduce 操作。</p><h2 id="附录a" tabindex="-1"><a class="header-anchor" href="#附录a" aria-hidden="true">#</a> 附录A</h2><p>单词频率</p><p>本节包含一个程序，用于统计在命令行中指定的一组输入文件中每个唯一单词的出现次数。</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;mapreduce/mapreduce.h&quot;
// User&#39;s map function
class WordCounter : public Mapper {
  public:
    virtual void Map(const MapInput&amp; input) {
        const string&amp; text = input.value();
        const int n = text.size();
        for (int i = 0; i &lt; n; ) {
            // Skip past leading whitespace
            while ((i &lt; n) &amp;&amp; isspace(text[i]))
                i++;
            // Find word end
            int start = i;
            while ((i &lt; n) &amp;&amp; !isspace(text[i]))
                i++;
            if (start &lt; i)
                Emit(text.substr(start,i-start),&quot;1&quot;);
        }
}
};

REGISTER_MAPPER(WordCounter);

// User&#39;s reduce function
class Adder : public Reducer {
    virtual void Reduce(ReduceInput* input) {
        // Iterate over all entries with the
        // same key and add the values
        int64 value = 0;
        while (!input-&gt;done()) {
            value += StringToInt(input-&gt;value());
            input-&gt;NextValue();
        }
        // Emit sum for input-&gt;key()
        Emit(IntToString(value));
    }
};

REGISTER_REDUCER(Adder);

int main(int argc, char** argv) {
    ParseCommandLineFlags(argc, argv);
    MapReduceSpecification spec;
    // Store list of input files into &quot;spec&quot;
    for (int i = 1; i &lt; argc; i++) {
        MapReduceInput* input = spec.add_input();
        input-&gt;set_format(&quot;text&quot;);
        input-&gt;set_filepattern(argv[i]);
        input-&gt;set_mapper_class(&quot;WordCounter&quot;);
    }
    // Specify the output files:
    // /gfs/test/freq-00000-of-00100
    // /gfs/test/freq-00001-of-00100
    // ...
    MapReduceOutput* out = spec.output();
    out-&gt;set_filebase(&quot;/gfs/test/freq&quot;);
    out-&gt;set_num_tasks(100);
    out-&gt;set_format(&quot;text&quot;);
    out-&gt;set_reducer_class(&quot;Adder&quot;);
    // Optional: do partial sums within map
    // tasks to save network bandwidth
    out-&gt;set_combiner_class(&quot;Adder&quot;);
    // Tuning parameters: use at most 2000
    // machines and 100 MB of memory per task
    spec.set_machines(2000);
    spec.set_map_megabytes(100);
    spec.set_reduce_megabytes(100);
    // Now run it
    MapReduceResult result;
    if (!MapReduce(spec, &amp;result)) abort();
    // Done: ’result’ structure contains info
    // about counters, time taken, number of
    // machines used, etc.
    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,60),t=[l];function d(u,c){return n(),i("div",null,t)}const p=e(s,[["render",d],["__file","lesson1-map-reduce-paper.html.vue"]]);export{p as default};
