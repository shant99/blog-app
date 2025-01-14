import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, ChangeEvent, useTransition } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { Selection } from "@nextui-org/react";
import useFilterStore from "@/store/useFilterStore";
import usePaginationStore from "@/store/usePaginationStore";

export const useFilters = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { filters, setFilters } = useFilterStore();
  const pageNumber = usePaginationStore((state) => state.pagination.pageNumber);
  const pageSize = usePaginationStore((state) => state.pagination.pageSize);
  const setPage = usePaginationStore((state) => state.setPage);
  const totalCount = usePaginationStore((state) => state.pagination.totalCount);
  const { gender, ageRange, orderBy, withPhoto } = filters;

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, setPage, withPhoto]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (gender) searchParams.set("gender", gender.join(","));
      if (ageRange) searchParams.set("ageRange", ageRange.toString());
      if (orderBy) searchParams.set("orderBy", orderBy);
      if (pageSize) searchParams.set("pageSize", pageSize.toString());
      if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());
      searchParams.set("withPhoto", withPhoto.toString());

      router.replace(`${pathname}?${searchParams}`);
    });
  }, [
    ageRange,
    orderBy,
    gender,
    router,
    pathname,
    withPhoto,
    pageNumber,
    pageSize,
  ]);

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const handleAgeSelect = (value: number[]) => {
    setFilters("ageRange", value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters("orderBy", value.values().next().value);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value))
      setFilters(
        "gender",
        gender.filter((genderValue) => genderValue !== value)
      );
    else setFilters("gender", [...gender, value]);
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters("withPhoto", e.target.checked);
  };

  return {
    orderByList,
    genderList,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    selectWithPhoto: handleWithPhotoToggle,
    filters,
    totalCount,
    isPending,
  };
};
