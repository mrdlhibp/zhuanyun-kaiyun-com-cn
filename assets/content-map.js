const contentMap = {
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["开云买球", "首页推荐", "最新资讯"],
      keywords: ["开云买球", "体育赛事", "在线娱乐"]
    },
    {
      id: "sports",
      title: "体育专区",
      tags: ["开云买球", "足球", "篮球", "网球"],
      keywords: ["开云买球", "体育博彩", "赛事直播"]
    },
    {
      id: "casino",
      title: "真人娱乐",
      tags: ["开云买球", "百家乐", "轮盘", "老虎机"],
      keywords: ["开云买球", "真人视讯", "娱乐场"]
    },
    {
      id: "esports",
      title: "电子竞技",
      tags: ["开云买球", "LOL", "DOTA2", "CSGO"],
      keywords: ["开云买球", "电竞竞猜", "赛事预测"]
    },
    {
      id: "promotions",
      title: "优惠活动",
      tags: ["开云买球", "首存", "返水", "红包"],
      keywords: ["开云买球", "注册优惠", "充值送"]
    }
  ],
  siteUrl: "https://www.zhuanyun-kaiyun.com.cn",
  defaultSection: "home",
  searchFilter: function(query) {
    if (!query || query.trim() === "") {
      return { results: [], total: 0 };
    }
    const lowerQuery = query.toLowerCase().trim();
    const matchedSections = [];
    this.sections.forEach(function(section) {
      const tagMatch = section.tags.some(function(tag) {
        return tag.toLowerCase().includes(lowerQuery);
      });
      const keywordMatch = section.keywords.some(function(kw) {
        return kw.toLowerCase().includes(lowerQuery);
      });
      const titleMatch = section.title.toLowerCase().includes(lowerQuery);
      if (tagMatch || keywordMatch || titleMatch) {
        matchedSections.push({
          id: section.id,
          title: section.title,
          relevance: tagMatch ? 3 : keywordMatch ? 2 : 1
        });
      }
    });
    matchedSections.sort(function(a, b) {
      return b.relevance - a.relevance;
    });
    return {
      results: matchedSections,
      total: matchedSections.length
    };
  },
  getSectionById: function(id) {
    for (var i = 0; i < this.sections.length; i++) {
      if (this.sections[i].id === id) {
        return this.sections[i];
      }
    }
    return null;
  },
  getAllTags: function() {
    var tagSet = {};
    this.sections.forEach(function(section) {
      section.tags.forEach(function(tag) {
        tagSet[tag] = true;
      });
    });
    return Object.keys(tagSet);
  },
  getAllKeywords: function() {
    var kwSet = {};
    this.sections.forEach(function(section) {
      section.keywords.forEach(function(kw) {
        kwSet[kw] = true;
      });
    });
    return Object.keys(kwSet);
  },
  generateSiteMap: function() {
    var base = this.siteUrl;
    var map = [];
    this.sections.forEach(function(section) {
      map.push({
        loc: base + "/" + section.id,
        title: section.title,
        tags: section.tags.slice(0, 3)
      });
    });
    return map;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = contentMap;
}