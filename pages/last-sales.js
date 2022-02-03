import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
export default function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR('https://nextjs-course-3ca66-default-rtdb.firebaseio.com/sales.json', fetcher);
    useEffect(() => {
        console.log(data)
        console.log(error)
        if (data) {
            console.log("a")
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume
                })
            }
            setSales(transformedSales)
        }
    }, [data])
    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://nextjs-course-3ca66-default-rtdb.firebaseio.com/sales.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             const transformedSales = [];

    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume
    //                 })
    //             }
    //             setSales(transformedSales)
    //             setIsLoading(false)
    //         })
    // }, []);
    if (error) {
        return <p>Failed to load...</p>
    }
    if (!data && !sales) {
        return <p>Loading</p>
    }
    console.log(sales)
    return (
        <ul>
            {sales.map(sale => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps(context) {
    console.log("xxx")
    const response = await fetch('https://nextjs-course-3ca66-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json()
    const transformedSales = [];

    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        })
    }

    return {
        props: {
            sales: transformedSales
        },
        revalidate: 30
    }




    // return fetch('https://nextjs-course-3ca66-default-rtdb.firebaseio.com/sales.json')
    // .then(response => response.json())
    // .then(data => {
    //     const transformedSales = [];

    //     for (const key in data) {
    //         transformedSales.push({
    //             id: key,
    //             username: data[key].username,
    //             volume: data[key].volume
    //         })
    //     }

    //     return {
    //         props: {
    //             sales: transformedSales
    //         },
    //         revalidate: 10
    //     }
    // })
}