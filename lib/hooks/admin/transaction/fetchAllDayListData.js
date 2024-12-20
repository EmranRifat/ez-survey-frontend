import { useQuery } from "@tanstack/react-query";

const getAddDayListData = async (token, search, page, page_size,start_date,end_date) => {
  // console.log("dateee-fetch", start_date, end_date);


  let url = `${process.env.NEXT_PUBLIC_API_URL}/submissions/get-start-of-day-list/`;
console.log("start-end-date ===>>",start_date,end_date);
  // Construct query params dynamically
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page);
  if (page_size) params.append("page_size", page_size);
  if (start_date) params.append("start_date", start_date);
  if (end_date) params.append("end_date", end_date);

  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

    try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });


    console.log("dayListData response ---> ", response);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid token or expired session.");
      }
      throw new Error(
        `Error fetching dayListData details: ${response.statusText}`
      );
    }

    const dayListData = await response.json();
    console.log("dayListDatas res data  ==>>", dayListData?.data);

    if (!dayListData?.data || dayListData?.data.length === 0) {
      return {
        status: "failed",
        message: "No dayListData available",
        data: [],
      };
    }

    return {
      status: "success",
      message: "dayListData fetched successfully.",
      data: dayListData,
      current_page: dayListData?.current_page,
    };
  } catch (error) {
    console.error("error", error.message);
    return {
      status: "failed",
      message: error.message || "Failed to fetch dayListData.",
      data: [],
    };
  }
};


export const useAllDayListData = (token, search, page, page_size ,start_date,end_date) => {
  return useQuery({
    queryKey: ["get-all-dayList", token, search, page, page_size,start_date,end_date],
    queryFn: () => getAddDayListData(token, search, page, page_size,start_date,end_date),
  });
};
