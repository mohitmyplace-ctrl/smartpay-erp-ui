"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([])
    const [amount, setAmount] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")

    async function loadInvoices() {
        const { data } = await supabase.from("invoices").select("*")
        setInvoices(data || [])
    }

    async function createInvoice(){
        await supabase.from("invoices").insert([
            {invoice_number:invoiceNumber, amount:amount, status:"pending"},
        ])
        setAmount("")
        setInvoiceNumber("")
        loadInvoices()
    }

    useEffect(() => {
        loadInvoices()
    }, [])
    
    return (
        <div style={{ padding: 40 }}>
            Invoices
            <div style={{ marginBottom: 20 }}>
                <input placeholder="Invoice Number" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
                <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <button onClick={createInvoice}>Create Invoice</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th style={{padding:10}}>Invoice</th>
                        <th style={{padding:10}}>Amount</th>
                        <th style={{padding:10}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td style={{padding:10}}>{invoice.invoice_number}</td>
                            <td style={{padding:10}}>{invoice.amount}</td>
                            <td style={{padding:10}}>{invoice.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}