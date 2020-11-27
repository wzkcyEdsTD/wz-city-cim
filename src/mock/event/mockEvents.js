export const mockEvents = [
    {
        SUBJECT: '11月23日上午8点30左右，网格员在例行网格巡查中发现有30余名温都金服的投资人集体在体育馆聚集',
        ISSUECONTENT: '据悉，该投资人群购买了一款理财产品因已立案未得到解决，于今日上午便在投资人群中煽动号召一起来街道要个说法。街道和派出所收到消息后，高度重视，街道、社区工作人员调派人员做好现场稳控工作，派出所调整安排充足警力，避免发生群体性冲突。街道将持续关注此事发展，如有情况将及时上报。',
        OCCURORG: '20217789',
        LASTUSERNAME: '李伟碧',
        OCCURDATE: '2020-11-23 00:00:00',
        LON: 120.670332,
        LAT: 28.004127,
        PHOTOURL: "/static/images/event/体育馆.png"
    },
    {
        SUBJECT: '2020年11月24日，网格员巡查发现蒲鞋市文化中心有20来人聚集，现场混乱并有大声喧哗，网格员以及乐巡人员立即上报社区及街道，并在现场维稳',
        ISSUECONTENT: '据悉因**公司因拖欠员工工资200w，所以造成人员聚集集体讨薪，随后，工作人员立即联系了劳动监管部门，约好第二天派代表在街道进行调解。',
        OCCURORG: '20217788',
        LASTUSERNAME: '李伟碧',
        OCCURDATE: '2020-11-24 00:00:00',
        LON: 120.688019,
        LAT: 28.008477,
        PHOTOURL: "/static/images/event/文化中心.png",
    },
]
export const mockProgress = {
    20217788: [
        { "DEALUSERNAME": "陈莉莹", "DEALDESCRIPTION": "新增", "DEALTIME": "2020/11/24 15:39:02" },
        { "DEALUSERNAME": "陈莉莹", "DEALDESCRIPTION": "结案", "DEALTIME": "2020/11/26 11:16:12" }
    ],
    20217789: [
        { "DEALUSERNAME": "林超超", "DEALDESCRIPTION": "新增", "DEALTIME": "2020/11/23 17:24:39" },
        { "DEALUSERNAME": "林超超", "DEALDESCRIPTION": "上报横河社区 ", "DEALTIME": "2020/11/23 17:26:04" },
        { "DEALUSERNAME": "姚思如", "DEALDESCRIPTION": "确认签收 ", "DEALTIME": "2020/11/25 9:21:07" },
        { "DEALUSERNAME": "姚思如", "DEALDESCRIPTION": "结案", "DEALTIME": "2020/11/25 9:21:28" }
    ],
}