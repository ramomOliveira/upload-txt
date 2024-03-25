import { createContext, useContext, useEffect, useState } from "react";
import { data } from "../../data";

type ListItem = {
  code: string;
  amount: number;
};

export type NewListItem = ListItem & {
  name: string;
  price: number;
  status: string;
  quantityInStock: number;
  category: string;
};

interface SendTxtFilesContextProps {
  newListItems: NewListItem[];
  setListItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
  currentIndex: number;
}

const SendTxtFilesContext = createContext({} as SendTxtFilesContextProps);

interface SendTxtFilesProviderProps {
  children: React.ReactNode;
}

export const SendTxtFilesProvider = ({
  children,
}: SendTxtFilesProviderProps) => {
  const oldListItems = data;
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [newListItems, setNewListItems] = useState<NewListItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkStock = (code: string) => {
    const item = oldListItems.find((item) => item.code === code);
    return item?.quantityInStock || 0;
  };

  const updateDetails = () => {
    const currentItem = listItems[currentIndex];
    const matchedItem = oldListItems.find(
      (oldItem) => oldItem.code === currentItem.code
    );

    if (matchedItem) {
      setNewListItems((prevList) => {
        return prevList.map((item) => {
          if (item.code === currentItem.code) {
            return {
              ...item,
              name: matchedItem.name,
              price: matchedItem.price,
              status:
                checkStock(matchedItem.code) < item.amount
                  ? "LACKING"
                  : "SUCCESS",
              quantityInStock: matchedItem.quantityInStock,
              category: matchedItem.category,
            };
          }
          return item;
        });
      });
    } else {
      setNewListItems((prevList) => {
        return prevList.map((item) => {
          if (item.code === currentItem.code) {
            return {
              ...item,
              name: "Não encontrado",
              price: 0,
              status: "NONEXISTENT",
              quantityInStock: 0,
              category: "",
            };
          }
          return item;
        });
      });
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const groupedItems = listItems.reduce((acc: NewListItem[], item) => {
      const existingItem = acc.find((group) => group.code === item.code);
      if (existingItem) {
        existingItem.amount += item.amount;
      } else {
        acc.push({
          code: item.code,
          name: "",
          price: 0,
          amount: item.amount,
          status: "SENDING",
          quantityInStock: 0,
          category: "",
        });
      }
      return acc;
    }, []);

    setNewListItems(groupedItems);
  }, [listItems]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < listItems.length) {
        updateDetails();
      } else {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [listItems, oldListItems, currentIndex]);

  return (
    <SendTxtFilesContext.Provider
      value={{
        newListItems,
        setListItems,
        currentIndex,
      }}
    >
      {children}
    </SendTxtFilesContext.Provider>
  );
};

export const useSendTxtFiles = () => useContext(SendTxtFilesContext);
