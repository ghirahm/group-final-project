import Seller from "@/components/layout/Seller";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <Seller> {children} </Seller>;
}