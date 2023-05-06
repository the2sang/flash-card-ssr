import {TMainCategory} from "@/types/types"
import MainCategory from "./MainCategory";


interface MainCategoryListProps {
  mainCategorys: TMainCategory[]
}

const MainCategoryList: React.FC<MainCategoryListProps> = ({mainCategorys}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
        <tr>
          <th>대분류 코드</th>
          <th>실행</th>
        </tr>
        </thead>
        <tbody>
        {mainCategorys?.list.map((mainCategory) => (
          <MainCategory key={mainCategory.id} mainCategory={mainCategory} />
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainCategoryList;