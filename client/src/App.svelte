<script context="module" lang="ts">
  import client from "@/lib/client";

  test();

  async function test() {
    const result = await client.createUser.mutate({
      email: "email@test.com",
      password: "password",
    });

    console.log(result);
  }
</script>

Fleetkit.
