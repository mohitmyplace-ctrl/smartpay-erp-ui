"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [upi, setUpi] = useState("")

  async function loadCustomers() {
    const { data } = await supabase.from("customers").select("*")
    setCustomers(data || [])
  } 

  async function addCustomer() {
    await supabase.from("customers").insert({ name, phone, upi })
    setName("")
    setPhone("")
    setUpi("")
    loadCustomers()
  }

  useEffect(() => {
    loadCustomers()
  }, [])    

  return (
    <div style={{ padding: 40 }}> 
    Customers

    <div style={{ marginBottom: 20 }}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="UPI" value={upi} onChange={e => setUpi(e.target.value)} />
      <button onClick={addCustomer}>Add Customer</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>UPI</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.upi}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}