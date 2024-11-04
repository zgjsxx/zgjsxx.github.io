import{_ as n,V as e,W as i,a0 as s}from"./framework-9a29aaa0.js";const a={},d=s(`<ul><li><a href="#mapreduce%E5%A4%A7%E5%9E%8B%E9%9B%86%E7%BE%A4%E4%B8%8A%E7%9A%84%E7%AE%80%E5%8C%96%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86">MapReduce：大型集群上的简化数据处理</a><ul><li><a href="#"></a></li><li><a href="#2%E7%BC%96%E7%A8%8B%E6%A8%A1%E5%9E%8B">2.编程模型</a><ul><li><a href="#21-%E4%BE%8B%E5%AD%90">2.1 例子</a></li></ul></li><li><a href="#%E9%99%84%E5%BD%95a">附录A</a></li></ul></li></ul><h1 id="mapreduce-大型集群上的简化数据处理" tabindex="-1"><a class="header-anchor" href="#mapreduce-大型集群上的简化数据处理" aria-hidden="true">#</a> MapReduce：大型集群上的简化数据处理</h1><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h2 id="_2-编程模型" tabindex="-1"><a class="header-anchor" href="#_2-编程模型" aria-hidden="true">#</a> 2.编程模型</h2><p>该计算接收一组输入键值对，并生成一组输出键值对。MapReduce 库的用户将计算表示为两个函数：Map（映射）和 Reduce（归约）。</p><p>Map（映射）函数由用户编写，接收一个输入键值对并生成一组中间键值对。MapReduce 库将所有与同一中间键 I 相关联的中间值组合在一起，并将它们传递给 Reduce（归约）函数。</p><p>Reduce（归约）函数，同样由用户编写，接收一个中间键 I 和该键的一组值。它将这些值合并在一起以形成一个可能更小的值集合。通常每次调用 Reduce 函数只会产生零个或一个输出值。中间值通过迭代器提供给用户的归约函数。这使得我们能够处理那些大到无法在内存中容纳的值列表。</p><h3 id="_2-1-例子" tabindex="-1"><a class="header-anchor" href="#_2-1-例子" aria-hidden="true">#</a> 2.1 例子</h3><p>考虑在大量文档集合中计算每个单词出现次数的问题。用户会编写类似于以下伪代码的代码：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>map<span class="token punctuation">(</span>String key, String value<span class="token punctuation">)</span>:
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>映射函数发出每个单词以及相关的出现次数计数（在这个简单的例子中只是 &quot;1&quot;）。归约函数将针对特定单词发出的所有计数相加求和。</p><p>此外，用户编写代码以用输入和输出文件的名称以及可选的调优参数来填充一个 MapReduce 规范对象。然后，用户调用 MapReduce 函数，将规范对象传递给它。用户的代码与用 C++ 实现的 MapReduce 库链接在一起。附录 A 包含了这个示例的完整程序文本。</p><h2 id="附录a" tabindex="-1"><a class="header-anchor" href="#附录a" aria-hidden="true">#</a> 附录A</h2><p>单词频率</p><p>本节包含一个程序，用于统计在命令行中指定的一组输入文件中每个唯一单词的出现次数。</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &quot;mapreduce/mapreduce.h&quot;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),l=[d];function t(u,r){return e(),i("div",null,l)}const v=n(a,[["render",t],["__file","lesson1-map-reduce-paper.html.vue"]]);export{v as default};
