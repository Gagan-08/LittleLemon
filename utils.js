import { useRef, useEffect } from 'react';

export const SECTION_LIST_MOCK_DATA = [
  {
    title: 'Appetizers',
    data: [
      {
        id: '1',
        title: 'Pasta',
        price: '10',
      },
      {
        id: '3',
        title: 'Pizza',
        price: '8',
      },
    ],
  },
  {
    title: 'Salads',
    data: [
      {
        id: '2',
        title: 'Caesar',
        price: '2',
      },
      {
        id: '4',
        title: 'Greek',
        price: '3',
      },
    ],
  },
];

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data) {
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items. 
  // Each item has the following properties: "id", "title" and "price"
  try {
    let sectionList = [];
    data.forEach(element => {
      if (sectionList.find((e)=>{return e==element.category}) == undefined)
        sectionList.push(element.category)
    });
    let res = []
    sectionList.forEach((section) => {
      res.push({ "title": section, "data": [] })
    })
    data.forEach((item) => {
      let i = res.findIndex((e)=>{return e.title==item.category})
      res[i].data.push({ "id": item.id, "title": item.title, "price": item.price })
    })
    return res;
  } catch (error) {
    return SECTION_LIST_MOCK_DATA;
  }
}


//Solution
// export function getSectionListData(data) {
//   const dataByCategory = data.reduce((acc, curr) => {
//     const menuItem = {
//       id: curr.id,
//       title: curr.title,
//       price: curr.price,
//     };
//     if (!Array.isArray(acc[curr.category])) {
//       acc[curr.category] = [menuItem];
//     } else {
//       acc[curr.category].push(menuItem);
//     }
//     return acc;
//   }, {});
//   const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
//     return {
//       title: key,
//       data: item,
//     };
//   });
//   return sectionListData;
//  }

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
