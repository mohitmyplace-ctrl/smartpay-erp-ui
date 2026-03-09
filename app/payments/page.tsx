"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function PaymentsPage() {
    const [payments, setPayments] = useState<any[]>([])
    const [invoiceID, setInvoiceID] = useState("")
    const [amount, setAmount] = useState("")

    async function loadPayments() {
        const { data } = await supabase.from("payments").select("*")
        setPayments(data || [])
    }
    
    async function recordPayment(){
        await supabase.from("payments").insert([
            {
                invoice_id:invoiceID, 
                amount:amount, 
                payment_method:"upi"
            }
        ])
        // update invoice status to PAID
        await supabase.from("invoices").update({status:"PAID"}).eq("id", invoiceID)
        setInvoiceID("")
        setAmount("")
        loadPayments()
    }

    return (
        <div>
            <h1>Payments</h1>
            <div style={{marginBottom:20}}>
                <input
                    style={{border:"1px solid gray", padding:8, marginRight:10}}
                    placeholder="Invoice"
                    value={invoiceID}
                    onChange={(e) => setInvoiceID(e.target.value)}
                />
                <input
                    style={{border:"1px solid gray", padding:8, marginRight:10}}
                    placeholder="Amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button 
                    style={{padding:10, backgroundColor:"blue", color:"white", border:"none", cursor:"pointer"}}
                    onClick={recordPayment}
                >
                Record Payment
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{padding:10}}>Invoice</th>
                        <th style={{padding:10}}>Amount</th>
                        <th style={{padding:10}}>Method</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((pay) => (
                        <tr key={pay.id}>
                            <td style={{padding:10}}>{pay.invoice_id}</td>
                            <td style={{padding:10}}>{pay.amount}</td>
                            <td style={{padding:10}}>{pay.payment_method}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}