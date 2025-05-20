import { useQuery } from "@tanstack/react-query";

const teamCodes = [
  "nc_dns",
  "ss_lns",
  "lg_twins",
  "ds_bas",
  "kia_tgs",
  "lt_gnt",
  "kt_wiz",
  "hw_egs",
  "kw_hrs",
  "ssg_lds",
];

const fetchAllProducts = async () => {
  const results = await Promise.all(
    teamCodes.map((code) =>
      fetch(`https://rookiejson.netlify.app/teamJson/${code}.json`).then(
        (res) => res.json()
      )
    )
  );
  return results.flat();
};

const useAllProductsQuery = () => {
  return useQuery({
    queryKey: ["homeAllProducts"],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 10,
  });
};

export default useAllProductsQuery;
