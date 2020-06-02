var database = new(function Database() {    
    this.thoughts = {
        happy: [],
        angry: [],
        sad: [],
        disgust: []
    }    
    this.userLicense = {
        title: 'Compayu用户协议',
        content: `
        <div id="pop-box-aboutus">
        <h3>Compayu用户协议</h3>
        <h4>一、总则</h4>
        <p>1.1　用户应当同意本协议的条款并按照页面上的提示完成全部的注册程序. 用户在进行注册程序过程中勾上"我已阅读并接受Compayu用户协议"复选框，即表示用户与Compayu公司达成协议，完全接受本协议项下的全部条款. </p>
        <p>1.2　用户注册成功后，Compayu将给予每个用户一个帐号以及相应的密码, 该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任.</p>
        <p>1.3　用户可以订阅并使用Compayu各种服务, 当用户使用Compayu各种服务时, 用户的使用行为视为其对该单项服务的服务条款以及Compayu在该单项服务中发出的各类公告的同意. </p>
        <p>1.4　Compayu会员服务协议以及各个单项服务条款和公告可由Compayu公司随时更新, 且无需另行通知. 您在使用相关服务时, 应关注并遵守其所适用的相关条款. </p>
        <p>您在使用Compayu提供的各项服务之前, 应仔细阅读本服务协议. 如您不同意本服务协议及/或随时对其的修改, 您可以主动取消Compayu提供的服务；您一旦使用Compayu服务, 即视为您已了解并完全同意本服务协议各项内容, 包括Compayu对服务协议随时所做的任何修改, 并成为Compayu用户. </p>
        <br>
        <h4>二、注册信息和隐私保护</h4>
        <p>2.1　用户应提供及时、详尽及准确的个人资料, 并不断更新注册资料, 符合及时、详尽准确的要求. 所有原始键入的资料将引用为注册资料. 如果因注册信息不真实而引起的问题, 并对问题发生所带来的后果, Compayu不负任何责任. </p>
        <p>2.2　用户不应将其帐号、密码转让或出借予他人使用. 如用户发现其帐号遭他人非法使用, 应立即通知Compayu. 因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用, Compayu不承担任何责任. </p>
        <p>2.3　Compayu不对外公开或向第三方提供单个用户的注册资料, 除非: </p>
        <ul>
            <li>（1）事先获得用户的明确授权；</li>
            <li>（2）只有透露你的个人资料, 才能提供你所要求的产品和服务；</li>
            <li>（3）根据有关的法律法规要求；</li>
            <li>（4）按照相关政府主管部门的要求；</li>
            <li>（5）为维护Compayu的合法权益.</li>
        </ul>
        <br>
        <h4>三、使用规则</h4>
        <p>3.1　用户在使用Compayu服务时, 必须遵守中华人民共和国相关法律法规的规定, 用户应同意将不会利用本服务进行任何违法或不正当的活动, 包括但不限于下列行为∶</p>

            <p>（1）上载、展示、张贴、传播或以其它方式传送含有下列内容之一的信息: </p>
            <p>&emsp;&emsp;1） 反对宪法所确定的基本原则的；</p>
            <p>&emsp;&emsp;2） 危害国家安全, 泄露国家秘密, 颠覆国家政权, 破坏国家统一的；</p>
            <p>&emsp;&emsp;3）损害国家荣誉和利益的；</p>
            <p>&emsp;&emsp;4） 煽动民族仇恨、民族歧视、破坏民族团结的；</p>
            <p>&emsp;&emsp;5） 破坏国家宗教政策, 宣扬邪教和封建迷信的； </p>
            <p>&emsp;&emsp;6） 散布谣言, 扰乱社会秩序, 破坏社会稳定的； </p>
            <p>&emsp;&emsp;7） 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
            <p>&emsp;&emsp;8） 侮辱或者诽谤他人, 侵害他人合法权利的；</p>
            <p>&emsp;&emsp;9） 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；</p>
            <p>&emsp;&emsp;10） 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容的； </p>
            <p>（2）不得为任何非法目的而使用网络服务系统；</p>
            <p>（3）不利用Compayu服务从事以下活动: </p>
            <p>&emsp;&emsp;1) 未经允许, 进入计算机信息网络或者使用计算机信息网络资源的；</p>
            <p>&emsp;&emsp;2) 未经允许, 对计算机信息网络功能进行删除、修改或者增加的；</p>
            <p>&emsp;&emsp;3) 未经允许, 对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</p>
            <p>&emsp;&emsp;4) 故意制作、传播计算机病毒等破坏性程序的；</p>
            <p>&emsp;&emsp;5) 其他危害计算机信息网络安全的行为. </p>
            <p>3.2　如用户在使用网络服务时违反任何上述规定, Compayu或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容等、暂停或终止用户使用网络服务的权利）以减轻和消除用户不当行为造成的影响. </p>
            <p>3.3　用户不得对本服务任何部分或本服务之使用或获得, 进行复制、拷贝、出售、转售或用于任何其它商业目的. </p>
            <p>3.4　用户须对自己在使用Compayu服务过程中的行为承担法律责任. 用户承担法律责任的形式包括但不限于: 对受到侵害者进行赔偿, 以及在Compayu公司首先承担了因用户行为导致的行政处罚或侵权损害赔偿责任后, 用户应给予Compayu公司等额的赔偿. </p>
        <br>
        <h4>四、服务内容</h4>
        <p>4.1　Compayu网络服务的具体内容由Compayu根据实际情况提供. </p>
        <p>4.2　除非本服务协议另有其它明示规定, Compayu所推出的新产品、新功能、新服务, 均受到本服务协议之规范. </p>
        <p>4.3　为使用本服务, 您必须能够自行经有法律资格对您提供互联网接入服务的第三方, 进入国际互联网, 并应自行支付相关服务费用. 此外, 您必须自行配备及负责与国际联网连线所需之一切必要装备, 包括计算机、数据机或其它存取装置. </p>
        <p>4.4　鉴于网络服务的特殊性, 用户同意Compayu有权不经事先通知, 随时变更、中断或终止部分或全部的网络服务（包括收费网络服务）. Compayu不担保网络服务不会中断, 对网络服务的及时性、安全性、准确性也都不作担保. </p>
        <p>4.5　Compayu需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护, 如因此类情况而造成网络服务（包括收费网络服务）在合理时间内的中断, Compayu无需为此承担任何责任. Compayu保留不经事先通知为维修保养、升级或其它目的暂停本服务任何部分的权利. </p>
        <p>4.6 本服务或第三人可提供与其它国际互联网上之网站或资源之链接. 由于Compayu无法控制这些网站及资源, 您了解并同意, 此类网站或资源是否可供利用, Compayu不予负责, 存在或源于此类网站或资源之任何内容、广告、产品或其它资料, Compayu亦不予保证或负责. 因使用或依赖任何此类网站或资源发布的或经由此类网站或资源获得的任何内容、商品或服务所产生的任何损害或损失, Compayu不承担任何责任. </p>
        <p>4.7　用户明确同意其使用Compayu网络服务所存在的风险将完全由其自己承担. 用户理解并接受下载或通过Compayu服务取得的任何信息资料取决于用户自己, 并由其承担系统受损、资料丢失以及其它任何风险. Compayu对在服务网上得到的任何商品购物服务、交易进程、招聘信息, 都不作担保. </p>
        <p>4.8　6个月未登陆的帐号, Compayu保留关闭的权利.</p>
        <p>4.9　Compayu有权于任何时间暂时或永久修改或终止本服务（或其任何部分）, 而无论其通知与否, Compayu对用户和任何第三人均无需承担任何责任. </p>
        <p>4.10　终止服务</p>
        <p>    您同意Compayu得基于其自行之考虑, 因任何理由, 包含但不限于长时间未使用, 或Compayu认为您已经违反本服务协议的文字及精神, 终止您的密码、帐号或本服务之使用（或服务之任何部分）, 并将您在本服务内任何内容加以移除并删除. 您同意依本服务协议任何规定提供之本服务, 无需进行事先通知即可中断或终止, 您承认并同意, Compayu可立即关闭或删除您的帐号及您帐号中所有相关信息及文件, 及/或禁止继续使用前述文件或本服务. 此外, 您同意若本服务之使用被中断或终止或您的帐号及相关信息和文件被关闭或删除, Compayu对您或任何第三人均不承担任何责任. </p>
        <br>
        <h4>五、知识产权和其他合法权益（包括但不限于名誉权、商誉权）</h4>
        <p>5.1　用户专属权利</p>
        <p>  Compayu尊重他人知识产权和合法权益, 呼吁用户也要同样尊重知识产权和他人合法权益. 若您认为您的知识产权或其他合法权益被侵犯, 请按照以下说明向Compayu提供资料∶</p>
        <p>    请注意: 如果权利通知的陈述失实, 权利通知提交者将承担对由此造成的全部法律责任（包括但不限于赔偿各种费用及律师费）. 如果上述个人或单位不确定网络上可获取的资料是否侵犯了其知识产权和其他合法权益, Compayu建议该个人或单位首先咨询专业人士. </p>
        <p>为了Compayu有效处理上述个人或单位的权利通知, 请使用以下格式（包括各条款的序号）: </p>
        <ul>
            <li> 1. 权利人对涉嫌侵权内容拥有知识产权或其他合法权益和/或依法可以行使知识产权或其他合法权益的权属证明；</li>
            <li>2. 请充分、明确地描述被侵犯了知识产权或其他合法权益的情况并请提供涉嫌侵权的第三方网址（如果有）. </li>
            <li>3. 请指明涉嫌侵权网页的哪些内容侵犯了第2项中列明的权利. </li>
            <li>4. 请提供权利人具体的联络信息, 包括姓名、身份证或护照复印件（对自然人）、单位登记证明复印件（对单位）、通信地址、电话号码、传真和电子邮件. </li>
            <li>5. 请提供涉嫌侵权内容在信息网络上的位置（如指明您举报的含有侵权内容的出处, 即: 指网页地址或网页内的位置）以便我们与您举报的含有侵权内容的网页的所有权人/管理人联系. </li>
            <li>6. 请在权利通知中加入如下关于通知内容真实性的声明: “我保证, 本通知中所述信息是充分、真实、准确的, 如果本权利通知内容不完全属实, 本人将承担由此产生的一切法律责任. ”</li>
            <li>7. 请您签署该文件, 如果您是依法成立的机构或组织, 请您加盖公章. </li>
        </ul>

        <p>5.2　对于用户通过Compayu服务上传到Compayu网站上可公开获取区域的任何内容, 用户同意Compayu在全世界范围内具有免费的、永久性的、不可撤销的、非独家的和完全再许可的权利和许可, 以使用、复制、修改、改编、出版、翻译、据以创作衍生作品、传播、表演和展示此等内容（整体或部分）, 和/或将此等内容编入当前已知的或以后开发的其他任何形式的作品、媒体或技术中. </p>
        <p>5.3　Compayu拥有本网站内所有资料的版权. 任何被授权的浏览、复制、打印和传播属于本网站内的资料必须符合以下条件: </p>
        <ul>
            <li> 所有的资料和图象均以获得信息为目的；</li>
            <li>所有的资料和图象均不得用于商业目的；</li>
            <li>所有的资料、图象及其任何部分都必须包括此版权声明；</li>
            <li>网站所有的产品、技术与所有程序均属于Compayu知识产权, 在此并未授权. </li>
            <li>“空游”, “Compayu”及相关图形等为Compayu的注册商标. </li>
            <li>未经Compayu许可, 任何人不得擅自（包括但不限于: 以非法的方式复制、传播、展示、镜像、上载、下载）使用. 否则, Compayu将依法追究法律责任. </li>
        </ul>
        <br>
        <h4>六、青少年用户特别提示</h4>
        <p>青少年用户必须遵守全国青少年网络文明公约: </p>
        <p>要善于网上学习, 不浏览不良信息；要诚实友好交流, 不侮辱欺诈他人；要增强自护意识, 不随意约会网友；要维护网络安全, 不破坏网络秩序；要有益身心健康, 不沉溺虚拟时空. </p>
        <br>
        <h4>七、其他</h4>
        <p>7.1　本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律. </p>
        <p>7.2　如双方就本协议内容或其执行发生任何争议, 双方应尽量友好协商解决；协商不成时, 任何一方均可向Compayu所在地的人民法院提起诉讼. </p>
        <p>7.3　Compayu未行使或执行本服务协议任何权利或规定, 不构成对前述权利或权利之放弃. </p>
        <p>7.4　如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力, 本协议的其余条款仍应有效并且有约束力. </p>
        <p>请您在发现任何违反本服务协议以及其他任何单项服务的服务条款、Compayu各类公告之情形时, 通知Compayu. 您可以通过如下联络方式同Compayu联系：</p>
        <p>中国北京市海淀区西土城路10号北京邮电大学教1楼428 </p>
        <p>Compayu公司 投诉组</p>
        <p>邮政编码: 100876</p>
        </div>`
    }
    this.aboutUs = {
        title: '网站开发者信息',
        content: `
        <div id="pop-box-aboutus">
            <h2>将「技术+设计」做到极致</h2>
            <p>空游团队是努力将「技术+设计」做到极致的Web前端开发团队。我们专注于创造具备顶级用户体验的前端网页，帮助更多的人享受科技的乐趣。美，是程序之美、架构之美、功能之美、交互之美、外观之美、内容之美，我们善于运用技术与设计的力量创造最美的体验。</p>
            <br>
            
            <h2>创造优雅易用的前端网页</h2>
            <p>从工业革命开始到现在，现实世界中的产品，已经由满足基本需求、方便大量生产，转向注重品质，帮助人们拥有更好的生活体验。从信息革命开始到现在，历史的车轮正滚滚向前，未来的网页，需要更注重品质，需要在功能、交互、外观、内容等方面满足「美」的要求。</p>
    
            <p>最优秀的网页需要最优秀的开发者来创造，我们双手敲出的是优雅的代码，架构在底层的是扎实的架构，而在人们面前展现出的是流畅的交互、美丽的视觉、极致的用户体验。同样，我们需要最优秀的设计师来定义网页功能与外观，需要最优秀的测试人员保证网页质量，最优秀的用户提供最棒的内容。</p>
    
            <p>我们重新定义前端网页，将「技术+设计」做到极致，创造出真正赏心悦目的、能够优雅的帮助用户解决问题的应用。我们的标准，是人们在浏览我们的网页时，嘴角流露出的微笑，是在人群中不经意听到的褒奖，是每一个网页都是「用心之作」。</p>
            <br>
            
            <h2>理想主义的海盗</h2>
            <p>在我们这个时代，有一些不一样的海盗。他们文质彬彬，却狂野于创造力的草原上；他们不尚暴力，却在信息世界里劫掠如火；他们不擅装腔作势、不巧于辞令，却可以优雅地构建最美的网页。他们坚韧不拔，忍耐着一路的艰辛，他们总是无厘头的搞笑，海阔天空不羁放纵，他们小步快跑酣畅淋漓，只为梦想。他们敢想，更敢于付诸行动，而且，他们一直抱团前行。</p>
    
            <p>海盗们的工作并不轻松，但是真心愉悦。什么陈规旧俗，什么等级阶层，什么乱七八糟的形式主义装腔作势，通通一边去。海盗们喜欢简单粗暴，一切以做好事情为准。海盗们从不吝惜互相帮助，因为，是自己的伙伴啊。每当抬起头来，看到伙伴们，幸福感总是暖上心头。</p>
    
            <p>这个世界上有不少认真的人，那些洋溢着灿烂微笑的餐厅服务员，那些认真负责送货上门的快递员，那些主动伸手帮你的保安，那些真诚对待每一位病人的医生，那些乐于分享的人们。当认真的人们彼此相遇，总是感觉双眼闪着亮光。他们都是海盗。</p>
    
            <p>认真的海盗，和认真的人一起，航行于最美的时光中。</p>
            <br>
    
            <h2>伙伴体验</h2>
            <p>空游团队的每一位成员都是伙伴，拥有同样的理想。相遇时，我们发现彼此都是两眼放光的同路人。完成工作永远不是目标，共同创造美好事物才是我们的追求。</p>
    
            <p>空游团队坚信，团队整体的成长取决于每一位伙伴的成长。空游团队在设计、研发、运营方面都拥有一流的经验，每一位伙伴在团队的支持下都能获得健康成长。多元的文化与专业背景在这里碰撞，计算机、设计、统计学、心理学、文化遗产等等，创新的火花由此产生。</p>
            
            <p>人在一生当中，相当长的时光是在工作中过度，我们认为工作中开心、快乐的氛围和体验同样会决定人们的生活品质。所以，伙伴们会确保快乐的工作，无论是来自伙伴的支持、信任还是生活的五彩缤纷，我们是更大的一家人。</p>
            <br>
    
            <h2>加入我们</h2>
            <p>你将同业内一流的伙伴们并肩奋斗，创造赏心悦目的网页，充分发挥自己的创造力，并在前进的过程中获得成长。</p>
            <p>如果你一样有梦想，如果你肯为梦想而努力，如果你希望和伙伴们一起工作。</p>
            <p>如果你不想浪费生命在无意义的工作中，如果你够聪明够努力只是缺一个机会。</p>
        </div>
        `
    }
});