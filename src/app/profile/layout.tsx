import Costumer from "@/components/layout/Costumer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <Costumer> {children} </Costumer>;
}